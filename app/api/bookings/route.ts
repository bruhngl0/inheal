import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

import { z } from 'zod';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.string().optional().or(z.number().optional()), // Allow string or number for age input
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  service: z.enum(['individual_session', 'group_session', 'environmental_session', 'customisable_session']),
  booking_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  booking_time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Zod Validation
    const validation = bookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, age, phone, service, booking_date, booking_time } = validation.data;

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
      `INSERT INTO bookings (name, email, age, phone, service, booking_date, booking_time, payment_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
       RETURNING *`,
      [name, email, age || null, phone || null, service, booking_date, booking_time]
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

