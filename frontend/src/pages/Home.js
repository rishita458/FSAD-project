import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';

const Home = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const response = await apiClient.get('/professionals');
      setProfessionals(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (professionalId) => {
    navigate(`/booking/${professionalId}`);
  };

  return (
    <div className="home-container">
      <section className="hero">
        <h1>Find Professional Services</h1>
        <p>Connect with skilled professionals in your area</p>
      </section>

      <section className="professionals-section">
        <h2>Available Professionals</h2>
        {loading ? (
          <p>Loading professionals...</p>
        ) : professionals.length > 0 ? (
          <div className="professionals-grid">
            {professionals.map((professional) => (
              <div key={professional.id} className="professional-card">
                <h3>{professional.name || 'Professional'}</h3>
                <p className="specialization">{professional.specialization}</p>
                <p className="experience">
                  Experience: {professional.yearsOfExperience} years
                </p>
                <p className="hourly-rate">₹{professional.hourlyRate}/hour</p>
                <button 
                  className="book-btn"
                  onClick={() => handleBooking(professional.id)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No professionals available yet.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
