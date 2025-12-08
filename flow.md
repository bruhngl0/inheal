//========================================================================================================
INHEAL FOLDER STRUCTURE
//========================================================================================================

inheal-root/
├── app/
│ ├── api/
│ │ ├── bookings/
│ │ │ └── route.ts # POST - create booking
│ │ ├── slots/
│ │ │ └── route.ts # GET - fetch available slots
│ │ └── payment/
│ │ ├── create-order/
│ │ │ └── route.ts # POST - create Razorpay order
│ │ └── verify/
│ │ └── route.ts # POST - verify payment
│ ├── success/
│ │ └── page.tsx # Booking success page
│ ├── layout.tsx
│ ├── page.tsx # Main booking form page
│ └── globals.css
│
├── components/
│ ├── BookingForm.tsx # Main form component
│ ├── ServiceSelector.tsx # Service selection
│ ├── TimeSlotPicker.tsx # Time slot selection
│ └── PaymentButton.tsx # Razorpay payment integration
│
├── lib/
│ ├── db.ts # Database connection (Prisma/MongoDB)
│ ├── razorpay.ts # Razorpay client setup
│ ├── validations.ts # Form validation schemas (Zod)
│ └── utils.ts # Helper functions
│
├── types/
│ └── index.ts # TypeScript interfaces
│ # (Booking, TimeSlot, Service, etc.)
│
├── config/
│ └── services.ts # Services config (prices, durations)
│
├── public/
│ └── favicon.ico
│
├── .env.local # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── next.config.ts
