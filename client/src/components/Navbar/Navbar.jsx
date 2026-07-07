import "./Navbar.css";
import { FiSearch, FiBell, FiCalendar, FiUser } from "react-icons/fi";

import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="search-box">
          <FiSearch className="search-icon" />

          <input type="text" placeholder="Search customers, tickets..." />
        </div>
      </div>

      <div className="navbar-right">
        <div className="date-box">
          <FiCalendar />
          <span>July 2026</span>
        </div>

        <button className="notification-btn">
          <FiBell />
          <span className="badge">3</span>
        </button>

        <div className="profile-avatar-u">
          <FiUser />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
