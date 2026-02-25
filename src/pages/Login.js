import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (!username || !email) {
      alert("Please fill all fields");
      return;
    }

    const user = { username, email };
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to your existing dashboard
    navigate("/user", { replace: true });
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Login to ServiceConnect</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} style={buttonStyle}>
          Login
        </button>
      </div>
    </div>
  );
}

/* ----------- Modern Booking-Style UI ----------- */

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f3e8ff"
};

const cardStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "16px",
  width: "360px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  textAlign: "center"
};

const titleStyle = {
  marginBottom: "30px",
  color: "#4b0082"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
  outline: "none"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#6a5acd",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "15px"
};

export default Login;