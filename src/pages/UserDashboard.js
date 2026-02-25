import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 Prevent access if not logged in
  if (!user) {
    navigate("/");
  }

  const [search, setSearch] = useState("");

  const professionals = [
    { name: "Rahul", role: "Plumber", experience: "5 years" },
    { name: "Anita", role: "Electrician", experience: "3 years" },
    { name: "Kiran", role: "Cleaner", experience: "4 years" },
    { name: "Suresh", role: "Cook", experience: "6 years" },
    { name: "Priya", role: "Server", experience: "4 years" },
    { name: "Ravi", role: "Personal Tutor", experience: "7 years" },
    { name: "Meena", role: "Personal Assistant", experience: "5 years" }
  ];

  const filtered = professionals.filter((pro) =>
    pro.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleHire = (pro) => {
    const existing =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      id: Date.now(),
      ...pro,
      status: "Pending"
    };

    localStorage.setItem(
      "bookings",
      JSON.stringify([...existing, newBooking])
    );

    alert("Booking Added!");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "linear-gradient(to bottom, #6a5acd, #9370db)",
        color: "white",
        padding: "30px 20px"
      }}>
        <h2>User Panel</h2>

        <div style={menuItem} onClick={() => navigate("/user")}>
          Dashboard
        </div>

        <div style={menuItem} onClick={() => navigate("/profile")}>
          Profile
        </div>

        <div style={menuItem} onClick={() => navigate("/history")}>
          My Bookings
        </div>

        <div style={menuItem} onClick={() => navigate("/profession")}>
          Profession
        </div>

        <div style={menuItem} onClick={handleLogout}>
          Logout
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px", background: "#f3e8ff" }}>
        <input
          placeholder="Search service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", width: "300px", marginBottom: "30px" }}
        />

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {filtered.map((pro, index) => (
            <div key={index} className="card">
              <h3>{pro.name}</h3>
              <p>{pro.role}</p>
              <p>{pro.experience}</p>

              <button
                className="primary-btn"
                onClick={() => handleHire(pro)}
              >
                Hire Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const menuItem = {
  padding: "12px",
  marginBottom: "10px",
  cursor: "pointer",
  borderRadius: "8px"
};

export default UserDashboard;