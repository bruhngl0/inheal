"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export default function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/bookings");
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getBookingsForDate = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.booking_date)
        .toISOString()
        .split("T")[0];
      return bookingDate === dateString;
    });
  };

  const getDateColor = (date) => {
    const dayBookings = getBookingsForDate(date);
    if (dayBookings.length === 0) return "";

    const hasPaid = dayBookings.some((b) => b.payment_status === "paid");
    const hasPending = dayBookings.some((b) => b.payment_status === "pending");
    const hasFailed = dayBookings.some((b) => b.payment_status === "failed");

    // Priority: paid > pending > failed
    if (hasPaid) return "bg-green-100 border-green-500 text-green-900";
    if (hasPending) return "bg-yellow-100 border-yellow-500 text-yellow-900";
    if (hasFailed) return "bg-red-100 border-red-500 text-red-900";
    return "";
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
    setSelectedDate(null);
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    setSelectedDate(clickedDate);
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek, year, month } =
      getDaysInMonth(currentDate);
    const days = [];

    // Empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-20 border border-gray-200 bg-gray-50"
        ></div>,
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayBookings = getBookingsForDate(date);
      const colorClass = getDateColor(date);
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-20 border border-gray-200 p-2 cursor-pointer transition-all hover:shadow-md ${colorClass} ${
            isSelected ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <div className="font-semibold text-sm">{day}</div>
          {dayBookings.length > 0 && (
            <div className="mt-1">
              <div className="text-xs font-medium">
                {dayBookings.length} booking{dayBookings.length > 1 ? "s" : ""}
              </div>
            </div>
          )}
        </div>,
      );
    }

    return days;
  };

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const selectedBookings = selectedDate ? getBookingsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Calendar
          </h1>
          <p className="text-gray-600">View all bookings by date</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {monthYear}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handlePreviousMonth}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading bookings...</p>
              </div>
            ) : (
              <>
                <div className="p-6">
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center font-semibold text-gray-700 text-sm py-2"
                        >
                          {day}
                        </div>
                      ),
                    )}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar()}
                  </div>
                </div>

                {/* Legend */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                    Legend
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
                      <span className="text-sm text-gray-700">Paid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-500 rounded"></div>
                      <span className="text-sm text-gray-700">Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-100 border-2 border-red-500 rounded"></div>
                      <span className="text-sm text-gray-700">Failed</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Selected Date Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-fit">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Select a date"}
              </h3>
            </div>

            <div className="p-6">
              {!selectedDate ? (
                <p className="text-gray-500 text-sm text-center py-8">
                  Click on a date to view bookings
                </p>
              ) : selectedBookings.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">
                  No bookings for this date
                </p>
              ) : (
                <div className="space-y-4">
                  {selectedBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {booking.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {booking.service}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            booking.payment_status === "paid"
                              ? "bg-green-100 text-green-800"
                              : booking.payment_status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {booking.payment_status}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>⏰ {booking.booking_time}</p>
                        <p>📧 {booking.email}</p>
                        <p>📱 {booking.phone}</p>
                        <p className="font-semibold text-gray-900">
                          ₹{booking.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
