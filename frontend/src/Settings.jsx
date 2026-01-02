// ============================================
// SETTINGS PAGE - Protected! Only logged-in users can see this
// ============================================

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Settings() {
  const [message, setMessage] = useState("");

  const handleSave = () => {
    setMessage("Settings saved! (This is just a demo)");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="container">
      <h1>⚙️ Settings</h1>
      <p>This page is PROTECTED - only logged-in users can see it!</p>
      
      <div style={{
        border: "2px solid #2196F3",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
        backgroundColor: "#f9f9f9"
      }}>
        <h2>Your Settings:</h2>
        
        <div style={{marginBottom: "15px"}}>
          <label>
            <strong>Email Notifications:</strong>
            <input type="checkbox" defaultChecked style={{marginLeft: "10px"}} />
          </label>
        </div>

        <div style={{marginBottom: "15px"}}>
          <label>
            <strong>Theme:</strong>
            <select style={{marginLeft: "10px", padding: "5px"}}>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </label>
        </div>

        <button onClick={handleSave} className="btn btn-primary">
          Save Settings
        </button>

        {message && (
          <p style={{color: "green", marginTop: "10px"}}>{message}</p>
        )}
      </div>

      <div style={{marginTop: "20px"}}>
        <Link to="/dashboard" className="btn btn-secondary" style={{marginRight: "10px"}}>
          Back to Dashboard
        </Link>
        <Link to="/profile" className="btn btn-info" style={{marginRight: "10px"}}>
          View Profile
        </Link>
      </div>

      <div style={{
        marginTop: "30px",
        padding: "15px",
        backgroundColor: "#fff3cd",
        borderRadius: "5px"
      }}>
        <h3>🛡️ Protection Status:</h3>
        <p>✅ This page is protected on the frontend</p>
        <p>✅ If you weren't logged in, you'd be redirected to login</p>
        <p>ℹ️ In a real app, saving settings would also check your token on the backend!</p>
      </div>
    </div>
  );
}

export default Settings;

