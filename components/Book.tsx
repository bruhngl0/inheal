"use client";

import { useState, useEffect, useRef } from "react"; // Added useRef
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../styles/book.scss";
import { BookingFormData } from "@/types";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Book = () => {
  // Animation Refs
  const headingRef = useRef<HTMLDivElement>(null);
  const desRef = useRef<HTMLDivElement>(null);
  const formInputsRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    age: "",
    phone: "",
    service: "",
    booking_date: "",
    booking_time: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Intersection Observer Logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const elements = [
      headingRef.current,
      desRef.current,
      formInputsRef.current,
      serviceRef.current,
      calendarRef.current,
      ctaRef.current,
    ];

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ... (Keep your existing timeSlots, Razorpay useEffect, and handle functions)
  const timeSlots = [
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" },
    { value: "18:00", label: "6:00 PM" },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      fetch(`/api/bookings?date=${dateStr}`)
        .then((res) => res.json())
        .then((data) => setBookedSlots(data.bookedSlots || []))
        .catch((err) => console.error("Error fetching booked slots:", err));
    }
  }, [selectedDate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateStr = date.toISOString().split("T")[0];
      setFormData((prev) => ({
        ...prev,
        booking_date: dateStr,
        booking_time: "",
      }));
    }
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, booking_time: time }));
  };

  const handlePayLater = async () => {
    /* ... existing logic ... */
  };
  const handlePayNow = async () => {
    /* ... existing logic ... */
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="booking-main">
      <div ref={headingRef} className="booking-heading scroll-animate">
        <h1>Book a Session</h1>
      </div>

      <div
        ref={desRef}
        className="booking-des scroll-animate"
        style={{ animationDelay: "0.1s" }}
      >
        <p>Limited slots are available monthly for reduced-rate sessions...</p>
      </div>

      <div className="booking-form">
        <div ref={formInputsRef} className="booking-form-inputs scroll-animate">
          <div className="mb-6">
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-transparent text-lg outline-none booking-input-field"
              required
            />
          </div>
          <div className="mb-6">
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-transparent text-lg outline-none booking-input-field"
              required
            />
          </div>
          <div className="mb-6">
            <input
              placeholder="Age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full bg-transparent text-lg outline-none booking-input-field"
            />
          </div>
          <div className="mb-6">
            <input
              placeholder="Phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-transparent text-lg outline-none booking-input-field"
            />
          </div>
        </div>

        <div
          ref={serviceRef}
          className="booking-form-service scroll-animate"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="mb-6">
            <label className="font-bold text-lg">Preferred Service</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="booking-pref"
              required
            >
              <option value="">Select your service</option>
              <option value="consultation">Consultation</option>
              <option value="therapy">Therapy Session</option>
              <option value="coaching">Coaching</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>
        </div>

        <div
          ref={calendarRef}
          className="booking-calendar mb-8 scroll-animate"
          style={{ animationDelay: "0.3s" }}
        >
          <label
            className="font-bold text-lg mb-4 block"
            style={{ color: "#918a43" }}
          >
            Select Date
          </label>
          <div className="flex justify-center">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={{ before: today }}
              className="rounded-lg p-4"
              styles={{
                root: { fontFamily: "agatho" },
                day_selected: { backgroundColor: "#918a43", color: "#f5e6b3" },
              }}
            />
          </div>
        </div>

        {selectedDate && (
          <div className="booking-time mb-8 animate-in-simple">
            <label
              className="font-bold text-lg mb-4 block"
              style={{ color: "#918a43" }}
            >
              Select Time
            </label>
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot.value);
                const isSelected = formData.booking_time === slot.value;
                return (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => !isBooked && handleTimeSelect(slot.value)}
                    disabled={isBooked}
                    className={`p-3 rounded text-left transition-all ${
                      isBooked
                        ? "opacity-50 cursor-not-allowed bg-gray-200"
                        : isSelected
                          ? "bg-[#5A7C8A] text-white"
                          : "bg-transparent border-2 border-[#918a43]"
                    }`}
                    style={{
                      fontFamily: "helvetica",
                      color: isBooked
                        ? "#999"
                        : isSelected
                          ? "#fff"
                          : "#918a43",
                    }}
                  >
                    {slot.label}
                    {isBooked && (
                      <span className="block text-xs mt-1">Booked</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div
          ref={ctaRef}
          className="booking-cta scroll-animate"
          style={{ animationDelay: "0.4s" }}
        >
          <div
            style={{
              borderTop: "3px solid #918a43",
              marginTop: "24px",
              paddingTop: "24px",
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handlePayNow}
                disabled={isSubmitting}
                className="w-full py-2 rounded transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#918a43", color: "#f5e6b3" }}
              >
                {isSubmitting ? "PROCESSING..." : "PAY NOW"}
              </button>
              <button
                onClick={handlePayLater}
                disabled={isSubmitting}
                className="w-full py-2 rounded transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#918a43", color: "#fff5ca" }}
              >
                {isSubmitting ? "PROCESSING..." : "PAY LATER"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
