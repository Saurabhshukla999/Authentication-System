// ============================================
// PUBLIC PAGE - Anyone can see this! No login needed!
// ============================================
// This page is NOT protected - anyone can visit it!

import React from "react";
import { Link } from "react-router-dom";

function PublicPage() {
  return (
    <div className="container">
      <h1>🌍 Public Page</h1>
      <p style={{fontSize: "18px", color: "green"}}>
        ✅ <strong>This page is PUBLIC</strong> - anyone can see it, even without logging in!
      </p>
      
      <div style={{
        border: "2px solid #4CAF50",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
        backgroundColor: "#f1f8f4"
      }}>
        <h2>Welcome to Our Website!</h2>
        <p>This is a public page that everyone can access.</p>
        <p>You don't need to be logged in to see this page.</p>
        
        <div style={{marginTop: "20px"}}>
          <h3>What can you do here?</h3>
          <ul>
            <li>✅ View public information</li>
            <li>✅ Learn about our website</li>
            <li>✅ See public content</li>
          </ul>
        </div>

        <div style={{marginTop: "20px"}}>
          <h3>Want to see protected content?</h3>
          <p>You need to login first!</p>
          <Link to="/login" className="btn btn-primary" style={{marginRight: "10px"}}>
            Login
          </Link>
          <Link to="/register" className="btn btn-success">
            Register
          </Link>
        </div>
      </div>

      <div style={{
        marginTop: "30px",
        padding: "15px",
        backgroundColor: "#e8f5e9",
        borderRadius: "5px"
      }}>
        <h3>🔓 Protection Status:</h3>
        <p>❌ This page is NOT protected</p>
        <p>✅ Anyone can access it without login</p>
        <p>ℹ️ Compare this to the Dashboard, Profile, or Settings pages which ARE protected!</p>
      </div>
    </div>
  );
}

export default PublicPage;

