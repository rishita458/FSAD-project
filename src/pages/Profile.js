import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>My Profile</h2>

        {user ? (
          <>
            <div style={profileRow}>
              <span style={labelStyle}>Username</span>
              <span style={valueStyle}>{user.username}</span>
            </div>

            <div style={profileRow}>
              <span style={labelStyle}>Email</span>
              <span style={valueStyle}>{user.email}</span>
            </div>
          </>
        ) : (
          <p>No user data found.</p>
        )}
      </div>
    </div>
  );
}

/* -------- Modern UI Styles (Booking-style match) -------- */

const pageStyle = {
  padding: "40px",
  background: "#f3e8ff",
  minHeight: "100vh"
};

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  maxWidth: "500px",
  margin: "0 auto"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "30px",
  color: "#4b0082"
};

const profileRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #eee"
};

const labelStyle = {
  fontWeight: "bold",
  color: "#6a5acd"
};

const valueStyle = {
  color: "#333"
};

export default Profile;