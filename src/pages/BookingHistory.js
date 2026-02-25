import React, { useEffect, useState } from "react";
import "../styles/booking.css";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(saved);
  }, []);

  const handleCancel = (id) => {
    const updated = bookings.filter(
      (booking) => booking.id !== id
    );

    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  return (
    <div className="booking-page">
      <h2 className="booking-title">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <h3>No Bookings Yet 😔</h3>
          <p>Hire a professional to see bookings here.</p>
        </div>
      ) : (
        <div className="booking-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <h3>{booking.name}</h3>

                <span
                  className={`status ${
                    booking.status === "Approved"
                      ? "approved"
                      : "pending"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <p className="price">₹{booking.price}</p>

              {booking.status !== "Approved" && (
                <button
                  className="cancel-btn"
                  onClick={() =>
                    handleCancel(booking.id)
                  }
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;