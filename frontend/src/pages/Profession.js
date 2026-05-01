import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/apiClient';

const Profession = () => {
  const { user } = useAuth();
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      let url = '/professionals';
      if (filter === 'approved') {
        url += '?approved=true';
      } else if (filter === 'pending') {
        url += '?approved=false';
      }

      const response = await apiClient.get(url);
      setProfessionals(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, [filter]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="profession-container">
      <div className="profession-header">
        <h1>Professional Directory</h1>
        <p>Browse all professionals in our network</p>
      </div>

      <div className="filter-section">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({professionals.length})
        </button>
        <button
          className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Approved
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
      </div>

      <div className="professionals-list">
        {professionals.length > 0 ? (
          professionals.map((prof) => (
            <div key={prof.id} className="profession-card">
              <div className="card-top">
                <div className="card-title">
                  <h3>{prof.User?.name}</h3>
                  <span className={`approval-badge ${prof.isApproved ? 'approved' : 'pending'}`}>
                    {prof.isApproved ? '✅ Approved' : '⏳ Pending'}
                  </span>
                </div>
                <div className="card-rating">
                  <span className="stars">{'⭐'.repeat(Math.round(prof.rating))}</span>
                  <span className="rating-text">{prof.rating}/5</span>
                </div>
              </div>

              <div className="card-details">
                <p className="category">{prof.Category?.name}</p>
                <p className="experience">
                  📚 {prof.experience} years experience
                </p>
                <p className="rate">₹{prof.hourlyRate}/hour</p>
                {prof.qualifications && (
                  <p className="qualifications">
                    {prof.qualifications.substring(0, 100)}...
                  </p>
                )}
              </div>

              <div className="card-stats">
                <span className="stat">
                  📝 {prof.totalReviews} reviews
                </span>
                <span className="stat">
                  ✓ {prof.experience} yrs
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No professionals found</p>
        )}
      </div>
    </div>
  );
};

export default Profession;
