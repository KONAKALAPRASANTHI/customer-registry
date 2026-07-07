import "./Settings.css";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

import { FiUser, FiMail, FiMoon, FiBell, FiLock, FiSave } from "react-icons/fi";

function Settings() {
  const { user } = useUser();

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    alert("Settings saved successfully");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>

        <p>Manage your account preferences and application settings</p>
      </div>

      <div className="settings-container">
        <div className="settings-card">
          <div className="settings-title">
            <FiUser />

            <h2>Account Settings</h2>
          </div>

          <div className="settings-field">
            <label>Name</label>

            <input value={user?.fullName || ""} readOnly />
          </div>

          <div className="settings-field">
            <label>Email</label>

            <input
              value={user?.primaryEmailAddress?.emailAddress || ""}
              readOnly
            />
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-title">
            <FiMoon />

            <h2>Appearance</h2>
          </div>

          <div className="toggle-row">
            <div>
              <h3>Dark Mode</h3>

              <p>Use dark theme across dashboard</p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />

              <span></span>
            </label>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-title">
            <FiBell />

            <h2>Notifications</h2>
          </div>

          <div className="toggle-row">
            <div>
              <h3>Email Alerts</h3>

              <p>Receive ticket updates</p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />

              <span></span>
            </label>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-title">
            <FiLock />

            <h2>Security</h2>
          </div>

          <button className="save-settings" onClick={handleSave}>
            <FiSave />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
