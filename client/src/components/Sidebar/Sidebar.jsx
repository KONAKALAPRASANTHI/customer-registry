import "./Sidebar.css";
import { FiMessageSquare } from "react-icons/fi";
import { MdSupportAgent } from "react-icons/md";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiPieChart,
  FiSettings,
  FiUser,
  FiLogOut,
  FiFileText,
} from "react-icons/fi";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo">
          <MdSupportAgent size={40} color="#8b5cf6" />

          <div className="logo-text">
            <h2>CustomerCare</h2>
            <span>Registry</span>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <p>MAIN</p>

        <NavLink to="/dashboard" end>
          <FiHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/customers">
          <FiUsers />
          <span>Customers</span>
        </NavLink>

        <NavLink to="/tickets">
          <FiFileText />
          <span>Tickets</span>
        </NavLink>

        <NavLink to="/analytics">
          <FiPieChart />
          <span>Analytics</span>
        </NavLink>
      </div>

      <div className="sidebar-section">
        <p>ACCOUNT</p>

        <NavLink to="/profile">
          <FiUser />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/settings">
          <FiSettings />
          <span>Settings</span>
        </NavLink>

        <NavLink to="/">
          <FiLogOut />
          <span>Exit Dashboard</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
