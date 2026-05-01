import React from 'react';

const SupportDashboard = () => {
  return (
    <div className="support-dashboard-container">
      <h1>Support Center</h1>
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-items">
          <div className="faq-item">
            <h3>How do I book a professional?</h3>
            <p>Browse available professionals on the home page and click "Book Now" to schedule a service.</p>
          </div>
          <div className="faq-item">
            <h3>How do I become a professional?</h3>
            <p>Register as a professional during signup and complete your profile with your credentials.</p>
          </div>
          <div className="faq-item">
            <h3>How are payments processed?</h3>
            <p>Payments are securely processed through our payment gateway after service completion.</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Support</h2>
        <p>Email: support@serviceconnect.com</p>
        <p>Phone: +91-1800-SERVICE</p>
      </section>
    </div>
  );
};

export default SupportDashboard;
