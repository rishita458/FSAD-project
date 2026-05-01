import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import { useParams } from 'react-router-dom';

const BookingDetail = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    review: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      const response = await apiClient.get(`/bookings/${id}`);
      setBooking(response.data.data);
    } catch (error) {
      console.error('Failed to fetch booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await apiClient.post('/reviews', {
        bookingId: booking.id,
        professionalId: booking.professionalId,
        rating: reviewData.rating,
        review: reviewData.review,
      });

      alert('Review submitted successfully!');
      setShowReview(false);
      fetchBooking();
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!booking) return <div className="loading">Booking not found</div>;

  return (
    <div className="booking-detail-container">
      <div className="booking-header">
        <h1>Booking Details</h1>
        <span className={`status ${booking.status}`}>{booking.status.toUpperCase()}</span>
      </div>

      <div className="booking-info-grid">
        <div className="info-card">
          <h3>Professional</h3>
          <p className="bold">{booking.professional?.User?.name}</p>
          <p>{booking.professional?.Category?.name}</p>
        </div>

        <div className="info-card">
          <h3>Date & Duration</h3>
          <p className="bold">{new Date(booking.bookedDate).toLocaleDateString()}</p>
          <p>{booking.hours} hours</p>
        </div>

        <div className="info-card">
          <h3>Amount</h3>
          <p className="bold">₹{booking.totalAmount}</p>
          <p>Payment: {booking.paymentStatus}</p>
        </div>

        <div className="info-card">
          <h3>Location</h3>
          <p>{booking.location || 'Not specified'}</p>
        </div>
      </div>

      {booking.notes && (
        <div className="notes-section">
          <h3>Special Requirements</h3>
          <p>{booking.notes}</p>
        </div>
      )}

      {booking.status === 'completed' && !booking.hasReview && (
        <div className="review-section">
          {!showReview ? (
            <button
              className="btn-primary"
              onClick={() => setShowReview(true)}
            >
              Leave a Review
            </button>
          ) : (
            <form onSubmit={handleReviewSubmit} className="review-form">
              <h3>Rate Your Experience</h3>

              <div className="form-group">
                <label>Rating</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star ${reviewData.rating >= star ? 'active' : ''}`}
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Your Review</label>
                <textarea
                  value={reviewData.review}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, review: e.target.value })
                  }
                  placeholder="Share your experience with this professional..."
                  rows="4"
                  required
                />
              </div>

              <div className="button-group">
                <button
                  type="submit"
                  className="btn-success"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReview(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingDetail;
