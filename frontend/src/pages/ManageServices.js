import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/apiClient';

const ManageServices = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: '',
    experience: '',
    qualifications: '',
    hourlyRate: '',
    certifications: [],
    availability: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: false,
      Sunday: false,
    },
  });
  const [certInput, setCertInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, categoriesRes] = await Promise.all([
        apiClient.get('/professionals/profile'),
        apiClient.get('/categories'),
      ]);
      setProfile(profileRes.data.data);
      setCategories(categoriesRes.data || []);

      if (profileRes.data.data) {
        setFormData({
          categoryId: profileRes.data.data.categoryId,
          experience: profileRes.data.data.experience,
          qualifications: profileRes.data.data.qualifications,
          hourlyRate: profileRes.data.data.hourlyRate,
          certifications: profileRes.data.data.certifications || [],
          availability: profileRes.data.data.availability || {
            Monday: true,
            Tuesday: true,
            Wednesday: true,
            Thursday: true,
            Friday: true,
            Saturday: false,
            Sunday: false,
          },
        });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvailabilityChange = (day) => {
    setFormData({
      ...formData,
      availability: {
        ...formData.availability,
        [day]: !formData.availability[day],
      },
    });
  };

  const addCertification = () => {
    if (certInput.trim()) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, certInput],
      });
      setCertInput('');
    }
  };

  const removeCertification = (index) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (profile) {
        await apiClient.put('/professionals/profile', formData);
        alert('Profile updated successfully!');
      } else {
        await apiClient.post('/professionals/profile', formData);
        alert('Profile created successfully!');
      }
      setEditing(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert(error.response?.data?.message || 'Failed to save profile');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="manage-services-container">
      <h1>Manage Your Services</h1>

      {profile && !editing && (
        <div className="profile-summary">
          <div className="summary-card">
            <h2>Your Service Profile</h2>
            <div className="summary-content">
              <p>
                <strong>Service Category:</strong>{' '}
                {categories.find((c) => c.id === profile.categoryId)?.name}
              </p>
              <p>
                <strong>Experience:</strong> {profile.experience} years
              </p>
              <p>
                <strong>Hourly Rate:</strong> ₹{profile.hourlyRate}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {profile.isApproved ? (
                  <span className="badge-approved">✅ Approved</span>
                ) : (
                  <span className="badge-pending">⏳ Pending Approval</span>
                )}
              </p>
              <p>
                <strong>Rating:</strong> {profile.rating}/5 ({profile.totalReviews} reviews)
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}

      {editing && (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-section">
            <h2>Service Details</h2>

            <div className="form-group">
              <label>Service Category *</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Years of Experience *</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Hourly Rate (₹) *</label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label>Qualifications & Bio</label>
              <textarea
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="Describe your qualifications and experience..."
                rows="4"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Certifications</h2>
            <div className="certification-input">
              <input
                type="text"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                placeholder="Add certification..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCertification();
                  }
                }}
              />
              <button
                type="button"
                onClick={addCertification}
                className="btn-secondary"
              >
                Add
              </button>
            </div>

            <div className="certifications-list">
              {formData.certifications.map((cert, index) => (
                <div key={index} className="cert-item">
                  <span>{cert}</span>
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>Availability</h2>
            <p className="section-description">Select days you're available for work</p>
            <div className="availability-grid">
              {Object.entries(formData.availability).map(([day, available]) => (
                <label key={day} className="availability-checkbox">
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={() => handleAvailabilityChange(day)}
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-success">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                fetchData();
              }}
              className="btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ManageServices;
