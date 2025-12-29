import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, age, phone, service, booking_date, booking_time, preferredTime } = body;

    // Basic validation
    if (!name || !email || !service || !booking_date || !booking_time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if the slot is already booked (only paid bookings block slots)
    const checkSlot = await pool.query(
      'SELECT id FROM bookings WHERE booking_date = $1 AND booking_time = $2 AND payment_status = $3',
      [booking_date, booking_time, 'paid']
    );

    if (checkSlot.rows.length > 0) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 409 }
      );
    }

    // Insert booking with pending payment status
    const result = await pool.query(
      `INSERT INTO bookings (name, email, age, phone, service, booking_date, booking_time, preferred_time_slot, payment_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
       RETURNING *`,
      [name, email, age || null, phone || null, service, booking_date, booking_time, preferredTime || null]
    );

    return NextResponse.json(
      { 
        success: true, 
        booking: result.rows[0],
        message: 'Booking created successfully' 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (date) {
      // Get bookings for a specific date (only paid bookings block slots)
      const result = await pool.query(
        'SELECT booking_time FROM bookings WHERE booking_date = $1 AND payment_status = $2',
        [date, 'paid']
      );
      const bookedSlots = result.rows.map(row => row.booking_time);
      return NextResponse.json({ bookedSlots });
    }

    // Get all bookings (optional, for admin use)
    const result = await pool.query(
      'SELECT * FROM bookings ORDER BY booking_date DESC, booking_time DESC'
    );
    return NextResponse.json({ bookings: result.rows });
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings', details: error.message },
      { status: 500 }
    );
  }
}

