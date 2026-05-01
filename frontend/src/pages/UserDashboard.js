import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/apiClient';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsRes, profileRes] = await Promise.all([
        apiClient.get('/bookings'),
        apiClient.get('/users/profile'),
      ]);
      setBookings(bookingsRes.data.data || []);
      setProfile(profileRes.data.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <section className="profile-section">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p><strong>Name:</strong> {profile?.name}</p>
            <p><strong>Email:</strong> {profile?.email}</p>
            <p><strong>Phone:</strong> {profile?.phone || 'Not provided'}</p>
            <p><strong>Address:</strong> {profile?.address || 'Not provided'}</p>
          </div>
        </section>

        <section className="bookings-section">
          <h2>My Bookings</h2>
          {bookings.length > 0 ? (
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <h3>Professional: {booking.professionalName}</h3>
                  <p>Status: <span className={`status ${booking.status}`}>{booking.status}</span></p>
                  <p>Date: {new Date(booking.bookedDate).toLocaleDateString()}</p>
                  <p>Amount: ₹{booking.totalAmount}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No bookings yet. <a href="/home">Browse professionals</a></p>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
