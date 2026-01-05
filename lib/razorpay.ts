import Razorpay from "razorpay";

// Don't throw error during build
const key_id = process.env.RAZORPAY_KEY_ID || "";
const key_secret = process.env.RAZORPAY_KEY_SECRET || "";

export const razorpay = new Razorpay({
  key_id,
  key_secret,
});

// Validate at runtime when actually using razorpay
export function validateRazorpayConfig() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error(
      "Razorpay credentials are not set in environment variables",
    );
  }
}

export default razorpay;
