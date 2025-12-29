# Payment Integration Setup Guide

## Environment Variables

Add the following to your `.env.local` file:

```env
# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inheal
DB_USER=postgres
DB_PASSWORD=your_password_here

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Resend Email Configuration
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=Inheal <noreply@yourdomain.com>
```

## Database Setup

### For New Database:
Run the complete schema:
```bash
psql -d inheal -f database-schema.sql
```

### For Existing Database:
Run the migration script:
```bash
psql -d inheal -f database-migration.sql
```

## Razorpay Setup

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your API keys from the Razorpay Dashboard
3. Add both `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to `.env.local`
4. Add `NEXT_PUBLIC_RAZORPAY_KEY_ID` (same as `RAZORPAY_KEY_ID`) for client-side use

## Resend Setup

1. Sign up at [Resend](https://resend.com/)
2. Get your API key from the Resend Dashboard
3. Add `RESEND_API_KEY` to `.env.local`
4. Set `RESEND_FROM_EMAIL` to your verified domain email (format: `Name <email@domain.com>`)

## Payment Flow

1. User fills out booking form
2. Booking is created with `payment_status = 'pending'`
3. Razorpay order is created
4. Payment gateway opens
5. After successful payment:
   - Payment is verified
   - Booking status updated to `paid`
   - Confirmation email sent via Resend

## Service Pricing

Current service prices (in INR):
- Consultation: ₹1,500
- Therapy Session: ₹3,000
- Coaching: ₹2,500
- Workshop: ₹5,000

Update prices in `config/services.ts` if needed.

