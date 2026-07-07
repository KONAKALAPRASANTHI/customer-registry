import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import "./DashboardLayout.css";

function DashboardLayout() {
  return (
    <div className="layout">

      <Sidebar />

      <div className="main-area">

        <Navbar />

        <div className="page-container">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;