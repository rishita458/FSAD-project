import { FaTools, FaBolt, FaBroom, FaUtensils, FaConciergeBell, FaChalkboardTeacher, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard" style={{ textAlign: "center" }}>
      <h1 style={{ color: "#4b0082" }}>
        Find Trusted Professionals Near You
      </h1>

      <p style={{ color: "#6a5acd", marginBottom: "30px" }}>
        Search • Hire • Review • Grow
      </p>

      <button
        className="primary-btn"
        onClick={() => navigate("/register")}
      >
        Get Started
      </button>

      <button
        className="outline-btn"
        style={{ marginLeft: "15px" }}
        onClick={() => navigate("/login")}
      >
        Login
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
          marginTop: "50px",
        }}
      >
        {[
          "Plumber",
          "Electrician",
          "Cleaner",
          "Cook",
          "Server",
          "Personal Tutor",
          "Personal Assistant",
        ].map((service, index) => (
          <div key={index} className="card">
            <h3>{service}</h3>
            <p>Professional {service} available</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Home;