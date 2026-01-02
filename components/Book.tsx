"use client";

import { useState, useEffect } from "react";
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

  // Available time slots
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

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setRazorpayLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch booked slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      fetch(`/api/bookings?date=${dateStr}`)
        .then((res) => res.json())
        .then((data) => {
          setBookedSlots(data.bookedSlots || []);
        })
        .catch((err) => {
          console.error("Error fetching booked slots:", err);
          setBookedSlots([]);
        });
    }
  }, [selectedDate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateStr = date.toISOString().split("T")[0];
      setFormData((prev) => ({
        ...prev,
        booking_date: dateStr,
      }));
      // Reset time when date changes
      setFormData((prev) => ({
        ...prev,
        booking_time: "",
      }));
    }
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({
      ...prev,
      booking_time: time,
    }));
  };

  const handlePreferredTimeSelect = (time: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredTime: time,
    }));
  };

  const handlePayLater = async () => {
    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.service ||
      !formData.booking_date ||
      !formData.booking_time
    ) {
      alert("Please fill in all required fields including date and time.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create booking with payment_status = 'pending'
      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const bookingData = await bookingResponse.json();

      if (bookingResponse.ok) {
        alert("Booked successfully! You can pay later.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          age: "",
          phone: "",
          service: "",
          booking_date: "",
          booking_time: "",
        });
        setSelectedDate(undefined);
        setBookedSlots([]);
      } else {
        alert(
          bookingData.error || "Failed to create booking. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayNow = async () => {
    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.service ||
      !formData.booking_date ||
      !formData.booking_time
    ) {
      alert("Please fill in all required fields including date and time.");
      return;
    }

    if (!razorpayLoaded) {
      alert("Payment gateway is loading. Please wait a moment and try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Create booking
      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const bookingData = await bookingResponse.json();

      if (!bookingResponse.ok) {
        alert(
          bookingData.error || "Failed to create booking. Please try again.",
        );
        setIsSubmitting(false);
        return;
      }

      const bookingId = bookingData.booking.id;

      // Step 2: Create payment order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingId,
          service: formData.service,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        alert(
          orderData.error ||
            "Failed to create payment order. Please try again.",
        );
        setIsSubmitting(false);
        return;
      }

      // Step 3: Open Razorpay checkout
      const options = {
        key: orderData.order.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Inheal",
        description: `Booking for ${formData.service}`,
        order_id: orderData.order.id,
        handler: async function (response: any) {
          try {
            // Step 4: Verify payment
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking_id: bookingId,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok) {
              alert(
                "Payment successful! Booking confirmed. A confirmation email has been sent to your email address.",
              );
              // Reset form
              setFormData({
                name: "",
                email: "",
                age: "",
                phone: "",
                service: "",
                booking_date: "",
                booking_time: "",
              });
              setSelectedDate(undefined);
              setBookedSlots([]);
            } else {
              alert(
                verifyData.error ||
                  "Payment verification failed. Please contact support.",
              );
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert(
              "An error occurred during payment verification. Please contact support.",
            );
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone || "",
        },
        theme: {
          color: "#918a43",
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      razorpay.on("payment.failed", function (response: any) {
        alert(`Payment failed: ${response.error.description}`);
        setIsSubmitting(false);
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Disable past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="booking-main">
      {/* ======================================================================================================================================*/}

      <div className="booking-heading">
        <h1>Book a Session</h1>
      </div>

      {/* ======================================================================================================================================*/}

      <div className="booking-des">
        <p>
          Limited slots are available monthly for reduced-rate sessions, which
          are specifically to accommodate varying financial needs. To inquire
          about the availability of these sessions, please mention your request
          in the form below.{" "}
        </p>
      </div>

      {/* ======================================================================================================================================*/}

      <div className="booking-form">
        <div className="booking-form-inputs">
          <div className="mb-6">
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-transparent text-lg outline-none"
              style={{
                borderBottom: "2px solid #4A4A4A",
                color: "#4A4A4A",
                fontFamily: "serif",
              }}
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
              className="w-full bg-transparent text-lg outline-none"
              style={{
                borderBottom: "2px solid #4A4A4A",
                color: "#4A4A4A",
                fontFamily: "serif",
              }}
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
              className="w-full bg-transparent text-lg outline-none"
              style={{
                borderBottom: "2px solid #4A4A4A",
                color: "#4A4A4A",
                fontFamily: "serif",
              }}
            />
          </div>

          <div className="mb-6">
            <input
              placeholder="Phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-transparent text-lg outline-none"
              style={{
                borderBottom: "2px solid #4A4A4A",
                color: "#4A4A4A",
                fontFamily: "serif",
              }}
            />
          </div>
        </div>

        {/* ======================================================================================================================================*/}

        <div className="booking-form-service">
          {/* Service Dropdown */}
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

        {/* ======================================================================================================================================*/}

        {/* Calendar Section */}
        <div className="booking-calendar mb-8">
          <label
            className="font-bold text-lg mb-4 block"
            style={{
              color: "#918a43",
            }}
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
                root: {
                  fontFamily: "serif",
                },
                day_selected: {
                  backgroundColor: "#918a43",
                  color: "#f5e6b3",
                },
                day_today: {
                  fontWeight: "bold",
                },
              }}
            />
          </div>
        </div>

        {/* Time Slots Section */}
        {selectedDate && (
          <div className="booking-time mb-8">
            <label
              className="font-bold text-lg mb-4 block"
              style={{
                color: "#918a43",
              }}
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
                          : "bg-transparent border-2 border-[#918a43] hover:bg-[#918a43] hover:text-[#f5e6b3]"
                    }`}
                    style={{
                      fontFamily: "serif",
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

        {/* ======================================================================================================================================*/}

        <div className="booking-cta">
          <div
            style={{
              borderTop: "3px solid #5A7C8A",
              marginTop: "24px",
              paddingTop: "24px",
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handlePayNow}
                disabled={isSubmitting}
                className="w-full text-sl font-serif py-2 rounded transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: "#918a43",
                  color: "#f5e6b3",
                  letterSpacing: "",
                }}
              >
                {isSubmitting ? "PROCESSING..." : "PAY NOW"}
              </button>

              <button
                onClick={handlePayLater}
                disabled={isSubmitting}
                className="w-full text-sl font-serif py-2 rounded transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: "#5A7C8A",
                  color: "#f5e6b3",
                  letterSpacing: "",
                }}
              >
                {isSubmitting ? "PROCESSING..." : "PAY LATER"}
              </button>
            </div>
          </div>

          {/* ======================================================================================================================================*/}
        </div>
      </div>
    </div>
  );
};

export default Book;
