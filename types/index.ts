export interface Booking {
  id?: number;
  name: string;
  email: string;
  age: number | string;
  phone: string;
  service: string;
  booking_date: string; // YYYY-MM-DD format
  booking_time: string; // HH:MM format

  created_at?: string;
  updated_at?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  age: string;
  phone: string;
  service: string;
  booking_date: string;
  booking_time: string;

}

export interface TimeSlot {
  time: string;
  label: string;
  available: boolean;
}

