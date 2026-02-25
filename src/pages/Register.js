import React, { useState } from "react";
import "../styles/auth.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    if (!username || !email) {
      alert("Please fill all fields");
      return;
    }

    const newUser = { username, email };

    // Save registered user
    localStorage.setItem("registeredUser", JSON.stringify(newUser));

    alert("Registered Successfully!");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account ✨</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;