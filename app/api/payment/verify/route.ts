import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import pool from '@/lib/db';
import resend from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !booking_id) {
      return NextResponse.json(
        { error: 'Missing required payment verification fields' },
        { status: 400 }
      );
    }

    // Verify payment signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Get booking details
    const bookingResult = await pool.query(
      'SELECT * FROM bookings WHERE id = $1',
      [booking_id]
    );

    if (bookingResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    const booking = bookingResult.rows[0];

    // Update booking with payment details
    await pool.query(
      `UPDATE bookings 
       SET payment_status = $1, 
           razorpay_payment_id = $2, 
           razorpay_signature = $3,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4`,
      ['paid', razorpay_payment_id, razorpay_signature, booking_id]
    );

    // Send confirmation email if not already sent
    if (!booking.email_sent) {
      try {
        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #918a43; color: #f5e6b3; padding: 20px; text-align: center; }
                .content { background-color: #fff5ca; padding: 20px; }
                .details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Booking Confirmed!</h1>
                </div>
                <div class="content">
                  <p>Dear ${booking.name},</p>
                  <p>Your booking has been confirmed. Here are your booking details:</p>
                  <div class="details">
                    <p><strong>Service:</strong> ${booking.service}</p>
                    <p><strong>Date:</strong> ${new Date(booking.booking_date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><strong>Time:</strong> ${booking.booking_time}</p>
                    <p><strong>Payment Status:</strong> Paid</p>
                    <p><strong>Amount:</strong> ₹${booking.amount}</p>
                  </div>
                  <p>We look forward to seeing you!</p>
                  <p>Best regards,<br>Inheal Team</p>
                </div>
                <div class="footer">
                  <p>This is an automated email. Please do not reply.</p>
                </div>
              </div>
            </body>
          </html>
        `;

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Inheal <onboarding@resend.dev>',
          to: booking.email,
          subject: 'Booking Confirmation - Inheal',
          html: emailHtml,
        });

        // Mark email as sent
        await pool.query(
          'UPDATE bookings SET email_sent = TRUE WHERE id = $1',
          [booking_id]
        );
      } catch (emailError: any) {
        console.error('Error sending email:', emailError);
        // Don't fail the payment verification if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and booking confirmed',
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment', details: error.message },
      { status: 500 }
    );
  }
}

