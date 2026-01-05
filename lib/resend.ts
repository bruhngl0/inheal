import { Resend } from "resend";

let resendInstance: Resend | null = null;

export function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Resend API key is not set in environment variables");
  }

  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }

  return resendInstance;
}

export default getResend;
