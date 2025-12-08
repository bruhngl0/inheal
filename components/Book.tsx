"use client";

import { useState } from "react";
import "../styles/book.scss";

const Book = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    service: "",
    preferredTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeSelect = (time) => {
    setFormData((prev) => ({
      ...prev,
      preferredTime: time,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Booking session requested! Check console for details.");
  };

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
            <label>Preferred Service</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full text-lg font-serif p-3 rounded outline-none"
              style={{
                backgroundColor: "#918a43",
                color: "#F5E6B3",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
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

        <div className="booking-time">
          <div className="mb-8">
            <label
              className="block text-lg font-serif mb-4"
              style={{
                color: "#8B8662",
                border: "2px dotted #8B8662",
                display: "inline-block",
                padding: "4px 8px",
                backgroundColor: "#F5E6B3",
              }}
            >
              Select your preferred time
            </label>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "weekday-evening", label: "Weekday evening" },
                { value: "weekday-morning", label: "Weekday morning" },
                { value: "weekend-morning", label: "Weekend morning" },
                { value: "weekend-evening", label: "Weekend evening" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center cursor-pointer"
                  onClick={() => handleTimeSelect(option.value)}
                >
                  <div
                    className="w-8 h-8 rounded-sm flex items-center justify-center mr-3"
                    style={{
                      backgroundColor: "#9B956A",
                      border: "3px solid #5A7C8A",
                    }}
                  >
                    {formData.preferredTime === option.value && (
                      <div
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: "#5A7C8A" }}
                      ></div>
                    )}
                  </div>
                  <span
                    className="text-base font-serif"
                    style={{
                      color: "#5A7C8A",
                      border: "2px dotted #5A7C8A",
                      padding: "2px 6px",
                      backgroundColor: "#F5E6B3",
                    }}
                  >
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="booking-cta">
          <div
            style={{
              borderTop: "3px solid #5A7C8A",
              marginTop: "24px",
              paddingTop: "24px",
            }}
          >
            <button
              onClick={handleSubmit}
              className="w-full text-xl font-serif py-4 rounded transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: "#F5E6B3",
                color: "#8B8662",
                border: "3px dotted #8B8662",
                letterSpacing: "0.1em",
              }}
            >
              BOOK SESSION
            </button>
          </div>

          {/* ======================================================================================================================================*/}
        </div>
      </div>
    </div>
  );
};

export default Book;
