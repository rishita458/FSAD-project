import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../utils/apiClient';

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProfessionalsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/categories');
      setCategories(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setLoading(false);
    }
  };

  const fetchProfessionalsByCategory = async (categoryId) => {
    try {
      const response = await apiClient.get(`/professionals?categoryId=${categoryId}`);
      setProfessionals(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch professionals:', error);
    }
  };

  if (loading) return <div className="loading">Loading services...</div>;

  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Browse Services</h1>
        <p>Find professional services for all your needs</p>
      </div>

      <div className="services-layout">
        {/* Categories Sidebar */}
        <div className="categories-sidebar">
          <h2>Service Categories</h2>
          <div className="categories-list">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon || '🔧'}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Professionals Grid */}
        <div className="professionals-content">
          {selectedCategory ? (
            <>
              <h2>Available Professionals</h2>
              {professionals.length > 0 ? (
                <div className="professionals-grid">
                  {professionals.map((prof) => (
                    <div key={prof.id} className="professional-card">
                      <div className="card-header">
                        <h3>{prof.User?.name || 'Professional'}</h3>
                        <span className="rating">
                          ⭐ {prof.rating || 0}/5 ({prof.totalReviews || 0} reviews)
                        </span>
                      </div>

                      <div className="card-body">
                        <p className="specialization">{prof.Category?.name}</p>
                        <p className="experience">
                          📚 {prof.experience || 0} years experience
                        </p>
                        <p className="qualifications">
                          {prof.qualifications?.substring(0, 100)}...
                        </p>
                      </div>

                      <div className="card-footer">
                        <p className="hourly-rate">₹{prof.hourlyRate}/hour</p>
                        <Link
                          to={`/professional/${prof.id}`}
                          className="view-btn"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No professionals available in this category.</p>
              )}
            </>
          ) : (
            <div className="select-category">
              <p>👈 Select a category to view professionals</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
