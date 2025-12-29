import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Resend API key is not set in environment variables');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;

