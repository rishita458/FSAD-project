import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">🔧 Service Connect</Link>
        </div>

        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/professionals">Professionals</Link></li>
          <li><Link to="/support">Support</Link></li>

          {isAuthenticated ? (
            <>
              {user?.role === 'professional' ? (
                <>
                  <li><Link to="/professional-dashboard">Dashboard</Link></li>
                  <li><Link to="/manage-services">Manage Services</Link></li>
                </>
              ) : user?.role === 'admin' ? (
                <>
                  <li><Link to="/admin">Admin Panel</Link></li>
                  <li><Link to="/user-dashboard">Dashboard</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/user-dashboard">Dashboard</Link></li>
                  <li><Link to="/booking-history">My Bookings</Link></li>
                </>
              )}
              <li><Link to="/profile">Profile</Link></li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout ({user?.name})
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
