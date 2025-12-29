import { NextRequest, NextResponse } from 'next/server';
import razorpay from '@/lib/razorpay';
import pool from '@/lib/db';
import { getServicePrice } from '@/config/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, service } = body;

    if (!bookingId || !service) {
      return NextResponse.json(
        { error: 'Booking ID and service are required' },
        { status: 400 }
      );
    }

    // Get booking details
    const bookingResult = await pool.query(
      'SELECT * FROM bookings WHERE id = $1',
      [bookingId]
    );

    if (bookingResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    const booking = bookingResult.rows[0];

    // Check if already paid
    if (booking.payment_status === 'paid') {
      return NextResponse.json(
        { error: 'Booking already paid' },
        { status: 400 }
      );
    }

    // Get service price
    const amount = getServicePrice(service);
    const amountInPaise = amount * 100; // Convert to paise

    // Create Razorpay order
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `booking_${bookingId}_${Date.now()}`,
      notes: {
        booking_id: bookingId.toString(),
        service: service,
        customer_name: booking.name,
        customer_email: booking.email,
      },
    };

    const order = await razorpay.orders.create(options);

    // Update booking with order ID and amount
    await pool.query(
      `UPDATE bookings 
       SET razorpay_order_id = $1, amount = $2 
       WHERE id = $3`,
      [order.id, amount, bookingId]
    );

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      },
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order', details: error.message },
      { status: 500 }
    );
  }
}

