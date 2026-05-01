import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      const response = await apiClient.get('/bookings');
      setBookings(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="booking-loading">Loading...</div>;

  return (
    <div className="booking-history-container">
      <h1>Booking History</h1>
      {bookings.length > 0 ? (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-item">
              <h3>Professional: {booking.professionalName}</h3>
              <p>Status: <span className={`status ${booking.status}`}>{booking.status}</span></p>
              <p>Date: {new Date(booking.bookedDate).toLocaleDateString()}</p>
              <p>Amount: ₹{booking.totalAmount}</p>
              <p>Payment: {booking.paymentStatus}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingHistory;
