import rahulImg from "../assets/rahul.jpg";
import anitaImg from "../assets/anita.jpg";
import kiranImg from "../assets/kiran.jpg";
import cookImg from "../assets/cook.jpg";
import serverImg from "../assets/server.jpg";
import tutorImg from "../assets/tutor.jpg";
import assistantImg from "../assets/assistant.jpg";
import { useState, useEffect } from "react";

function Profession() {
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : [];
  });
  const [selected, setSelected] = useState(null);

 const professionals = [
  { id: 1, name: "Rahul", role: "Plumber", experience: "5 years", image: rahulImg },
  { id: 2, name: "Anita", role: "Electrician", experience: "3 years", image: anitaImg },
  { id: 3, name: "Kiran", role: "Cleaner", experience: "4 years", image: kiranImg },
  { id: 4, name: "Suresh", role: "Cook", experience: "6 years", image: cookImg },
  { id: 5, name: "Priya", role: "Server", experience: "4 years", image: serverImg },
  { id: 6, name: "Ravi", role: "Personal Tutor", experience: "7 years", image: tutorImg },
  { id: 7, name: "Meena", role: "Personal Assistant", experience: "5 years", image: assistantImg }
];
  const filtered = professionals.filter((pro) =>
    pro.role.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleHire = (pro) => {
    const newBooking = {
      ...pro,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };
    setBookings([...bookings, newBooking]);
    setSelected(newBooking);
  };

  const confirmBooking = () => {
    const updated = bookings.map((b) =>
      b.name === selected.name ? { ...b, status: "Confirmed" } : b
    );
    setBookings(updated);
    setSelected(null);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Search Professionals</h2>

      <input
        placeholder="Search by profession..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "10px", width: "300px", marginBottom: "20px" }}
      />

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {filtered.map((pro, index) => (
          <div key={index} className="card">
            <h3>{pro.name}</h3>
            <p>{pro.role}</p>
            <button className="primary-btn" onClick={() => handleHire(pro)}>
              Hire
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Popup */}
      {selected && (
        <div style={overlay}>
          <div style={popup}>
            <h3>Confirm Booking</h3>
            <p>You are hiring {selected.name}</p>
            <button className="primary-btn" onClick={confirmBooking}>
              Confirm
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => setSelected(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popup = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
};

export default Profession;