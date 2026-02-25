import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import BookingHistory from "./pages/BookingHistory";
import Profession from "./pages/Profession";

function App() {
  return (
    <Router>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Pages */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<BookingHistory />} />
        <Route path="/profession" element={<Profession />} />

      </Routes>
    </Router>
  );
}

export default App;