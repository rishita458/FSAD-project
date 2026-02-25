import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout";   // ⚠ keep same case as your file name
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BookingHistory from "./pages/BookingHistory";
import Profession from "./pages/Profession";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>

        {/* Login & Register without sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Sidebar Layout Pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<BookingHistory />} />
          <Route path="profession" element={<Profession />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;