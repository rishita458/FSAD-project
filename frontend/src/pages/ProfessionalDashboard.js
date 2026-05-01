import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/apiClient';

const ProfessionalDashboard = () => {
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
        apiClient.get('/bookings/professional'),
        apiClient.get('/professionals/profile'),
      ]);
      setBookings(bookingsRes.data.data || []);
      setProfile(profileRes.data.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await apiClient.put(`/bookings/${bookingId}/status`, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  if (loading) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Professional Dashboard</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <section className="profile-section">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p><strong>Name:</strong> {profile?.name}</p>
            <p><strong>Specialization:</strong> {profile?.specialization}</p>
            <p><strong>Experience:</strong> {profile?.yearsOfExperience} years</p>
            <p><strong>Hourly Rate:</strong> ₹{profile?.hourlyRate}</p>
            <p><strong>Bio:</strong> {profile?.bio || 'Not provided'}</p>
          </div>
        </section>

        <section className="bookings-section">
          <h2>Upcoming Bookings</h2>
          {bookings.length > 0 ? (
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <h3>Client: {booking.userName}</h3>
                  <p>Status: <span className={`status ${booking.status}`}>{booking.status}</span></p>
                  <p>Date: {new Date(booking.bookedDate).toLocaleDateString()}</p>
                  <p>Amount: ₹{booking.totalAmount}</p>
                  <div className="action-buttons">
                    {booking.status === 'pending' && (
                      <>
                        <button 
                          className="accept-btn"
                          onClick={() => updateBookingStatus(booking.id, 'accepted')}
                        >
                          Accept
                        </button>
                        <button 
                          className="reject-btn"
                          onClick={() => updateBookingStatus(booking.id, 'rejected')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No bookings yet.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
