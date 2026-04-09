// ============================================
// PROFILE PAGE - Protected! Only YOU can see YOUR profile
// ============================================
// This page is PROTECTED - you need to be logged in to see it!

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "./config";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This API call is PROTECTED - it needs a token!
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // If no token, you shouldn't be here!
        if (!token) {
          setError("You need to be logged in!");
          setLoading(false);
          return;
        }

        // Send token with the request (like showing ID card)
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUserInfo(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response?.status === 403) {
          setError("Your session expired! Please login again.");
          // Clear invalid token
          localStorage.removeItem("token");
        } else {
          setError("Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return <div className="container">Loading your profile...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <p style={{color: "red"}}>{error}</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>👤 Your Profile</h1>
      <p>This page is PROTECTED - only logged-in users can see it!</p>
      
      {userInfo && (
        <div style={{
          border: "2px solid #4CAF50",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          backgroundColor: "#f9f9f9"
        }}>
          <h2>Your Information:</h2>
          <p><strong>User ID:</strong> {userInfo.user_id}</p>
          <p><strong>Name:</strong> {userInfo.user_name}</p>
          <p><strong>Email:</strong> {userInfo.user_email}</p>
          <p><strong>Role:</strong> 
            <span style={{
              color: userInfo.role === "admin" ? "red" : "blue",
              fontWeight: "bold",
              marginLeft: "10px"
            }}>
              {userInfo.role || "user"}
            </span>
          </p>
        </div>
      )}

      <div style={{marginTop: "20px"}}>
        <Link to="/dashboard" className="btn btn-secondary" style={{marginRight: "10px"}}>
          Back to Dashboard
        </Link>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      <div style={{
        marginTop: "30px",
        padding: "15px",
        backgroundColor: "#e3f2fd",
        borderRadius: "5px"
      }}>
        <h3>🔒 Security Note:</h3>
        <p>This page is protected by:</p>
        <ul>
          <li>✅ Frontend check (ProtectedRoute component)</li>
          <li>✅ Backend check (verifyToken middleware)</li>
          <li>✅ Token validation (checks if token is real)</li>
        </ul>
        <p><strong>Even if someone tries to bypass the frontend, the backend will block them!</strong></p>
      </div>
    </div>
  );
}

export default Profile;

