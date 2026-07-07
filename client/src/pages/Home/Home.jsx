import { Link } from "react-router-dom";
import { FiUsers, FiFileText, FiPieChart, FiArrowRight } from "react-icons/fi";
import { MdSupportAgent } from "react-icons/md";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Navbar */}

      <nav className="navbar">
        <div className="logo">
          <MdSupportAgent size={40} color="#8b5cf6" />

          <div className="logo-text">
            <h2>CustomerCare</h2>
            <span>Registry</span>
          </div>
        </div>
      </nav>

      {/* Hero */}

      <section className="hero">
        <h1>
          Modern Customer
          <br />
          Care Registry
        </h1>

        <p>
          Manage customers, support tickets and analytics from one powerful
          dashboard.
        </p>

        <div className="hero-buttons">
          <Link to="/dashboard" className="primary-btn">
            Enter Dashboard
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Features */}

      <section className="features">
        <div className="feature-card">
          <FiUsers className="feature-icon" />
          <h2>Customer Management</h2>

          <p>Add, edit and organize customer information with ease.</p>
        </div>

        <div className="feature-card">
          <FiFileText className="feature-icon" />
          <h2>Ticket Tracking</h2>

          <p>Create, assign and resolve customer support tickets quickly.</p>
        </div>

        <div className="feature-card">
          <FiPieChart className="feature-icon" />
          <h2>Analytics</h2>

          <p>Gain insights using beautiful charts and real-time reports.</p>
        </div>
      </section>

      {/* Stats */}

      <section className="stats">
        <div>
          <h2>1000+</h2>
          <p>Customers</p>
        </div>

        <div>
          <h2>5000+</h2>
          <p>Tickets Managed</p>
        </div>

        <div>
          <h2>99.9%</h2>
          <p>Reliability</p>
        </div>
      </section>

      {/* CTA */}

      <section className="cta">
        <h2>Ready to simplify customer support?</h2>

        <Link to="/dashboard" className="primary-btn">
          Open Dashboard
        </Link>
      </section>

      <footer>
        © 2026 CustomerCare Registry • Built with React, Node.js & MongoDB
      </footer>
    </div>
  );
}

export default Home;
