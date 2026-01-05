import { Resend } from "resend";

// Don't throw error during build - allow empty string
const apiKey = process.env.RESEND_API_KEY || "";

export const resend = new Resend(apiKey);

// Validate at runtime when actually using resend
export function validateResendConfig() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Resend API key is not set in environment variables");
  }
}

export default resend;
