import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/apiClient';

const ProfessionalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [professional, setProfessional] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    hours: 1,
    notes: '',
  });

  useEffect(() => {
    fetchProfessionalDetails();
    fetchReviews();
  }, [id]);

  const fetchProfessionalDetails = async () => {
    try {
      const response = await apiClient.get(`/professionals/profile/${id}`);
      setProfessional(response.data.data);
    } catch (error) {
      console.error('Failed to fetch professional:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await apiClient.get(`/reviews/professional/${id}`);
      setReviews(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const totalAmount = (professional.hourlyRate * bookingData.hours).toFixed(2);
      
      const response = await apiClient.post('/bookings', {
        professionalId: professional.id,
        bookedDate: bookingData.date,
        hours: bookingData.hours,
        totalAmount,
        notes: bookingData.notes,
      });

      alert('Booking created successfully!');
      navigate('/booking-history');
    } catch (error) {
      console.error('Booking failed:', error);
      alert(error.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!professional) return <div className="loading">Professional not found</div>;

  const totalCost = (professional.hourlyRate * bookingData.hours).toFixed(2);

  return (
    <div className="professional-detail-container">
      <div className="detail-header">
        <h1>{professional.User?.name}</h1>
        <div className="rating-info">
          <span className="stars">
            {'⭐'.repeat(Math.round(professional.rating))}
          </span>
          <span className="rating-text">
            {professional.rating}/5 ({professional.totalReviews} reviews)
          </span>
        </div>
      </div>

      <div className="detail-layout">
        {/* Professional Info */}
        <div className="detail-info">
          <section className="info-section">
            <h2>About</h2>
            <p className="category">
              <strong>Service:</strong> {professional.Category?.name}
            </p>
            <p className="experience">
              <strong>Experience:</strong> {professional.experience} years
            </p>
            <p className="rate">
              <strong>Hourly Rate:</strong> ₹{professional.hourlyRate}
            </p>
          </section>

          {professional.qualifications && (
            <section className="info-section">
              <h2>Qualifications</h2>
              <p>{professional.qualifications}</p>
            </section>
          )}

          {professional.certifications && professional.certifications.length > 0 && (
            <section className="info-section">
              <h2>Certifications</h2>
              <ul>
                {professional.certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </section>
          )}

          {professional.availability && (
            <section className="info-section">
              <h2>Availability</h2>
              <div className="availability">
                {Object.entries(professional.availability).map(([day, available]) => (
                  <p key={day}>
                    <strong>{day}:</strong> {available ? '✅ Available' : '❌ Not Available'}
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Booking Form */}
        <div className="detail-booking">
          <div className="booking-card">
            <h3>Book This Professional</h3>
            {!showBooking ? (
              <button
                className="btn-primary"
                onClick={() => setShowBooking(true)}
              >
                Book Now
              </button>
            ) : (
              <form onSubmit={handleBooking}>
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, date: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Hours Required</label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={bookingData.hours}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, hours: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Special Requirements</label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, notes: e.target.value })
                    }
                    placeholder="Any special requirements..."
                  />
                </div>

                <div className="cost-summary">
                  <p>
                    <strong>Hours:</strong> {bookingData.hours}h × ₹{professional.hourlyRate}
                  </p>
                  <p className="total">
                    <strong>Total Cost:</strong> ₹{totalCost}
                  </p>
                </div>

                <button type="submit" className="btn-success">
                  Confirm Booking
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setShowBooking(false)}
                >
                  Cancel
                </button>
              </form>
            )}

            <div className="booking-info">
              <p className="info-text">
                ✅ Secure booking system
              </p>
              <p className="info-text">
                ✅ Payment on completion
              </p>
              <p className="info-text">
                ✅ Protected by our guarantee
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>Customer Reviews</h2>
        {reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="review-user">
                    <strong>{review.User?.name}</strong>
                    <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                  </div>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="review-text">{review.review}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        )}
      </section>
    </div>
  );
};

export default ProfessionalDetail;
