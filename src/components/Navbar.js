import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "15px", background: "#4b0082", color: "white" }}>
      <Link to="/" style={{ marginRight: "15px", color: "white" }}>
        Home
      </Link>

      {user && (
        <>
          <Link to="/history" style={{ marginRight: "15px", color: "white" }}>
            My Bookings
          </Link>
        </>
      )}

      {user?.role === "admin" && (
        <Link to="/admin" style={{ marginRight: "15px", color: "white" }}>
          Dashboard
        </Link>
      )}

      {!user ? (
        <>
          <Link to="/login" style={{ marginRight: "15px", color: "white" }}>
            Login
          </Link>
          <Link to="/register" style={{ color: "white" }}>
            Register
          </Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default Navbar;