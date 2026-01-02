import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { getRoleFromToken, isAdmin } from "./utils/auth";
import axios from "axios";

// ============================================
// DASHBOARD - Regular user's home page
// ============================================
function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const role = getRoleFromToken();

  useEffect(() => {
    // Get your own info from the server
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserInfo(response.data);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Welcome! You are logged in.</p>
      {userInfo && (
        <div>
          <p><strong>Name:</strong> {userInfo.user_name}</p>
          <p><strong>Email:</strong> {userInfo.user_email}</p>
          <p><strong>Your Role:</strong> <span style={{color: role === "admin" ? "red" : "blue"}}>{role || "user"}</span></p>
          {role === "admin" && (
            <p style={{color: "green"}}>🌟 You are an ADMIN! You have special powers!</p>
          )}
        </div>
      )}
      <div style={{marginTop: "20px"}}>
        {isAdmin() && (
          <Link to="/admin" className="btn btn-primary" style={{marginRight: "10px"}}>
            Go to Admin Page
          </Link>
        )}
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
    </div>
  );
}

// ============================================
// ADMIN PAGE - Only admins can see this!
// ============================================
function AdminPage() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only admins can call this API
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/admin/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        if (err.response?.status === 403) {
          alert("You're not an admin! You can't see this page!");
          window.location.href = "/dashboard";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>🔐 Admin Control Panel</h1>
      <p>This is a special page only admins can see!</p>
      
      <h2>All Users in the System:</h2>
      <table style={{width: "100%", borderCollapse: "collapse", marginTop: "20px"}}>
        <thead>
          <tr style={{backgroundColor: "#f0f0f0"}}>
            <th style={{padding: "10px", border: "1px solid #ddd"}}>ID</th>
            <th style={{padding: "10px", border: "1px solid #ddd"}}>Name</th>
            <th style={{padding: "10px", border: "1px solid #ddd"}}>Email</th>
            <th style={{padding: "10px", border: "1px solid #ddd"}}>Role</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.user_id}>
              <td style={{padding: "10px", border: "1px solid #ddd"}}>{user.user_id}</td>
              <td style={{padding: "10px", border: "1px solid #ddd"}}>{user.user_name}</td>
              <td style={{padding: "10px", border: "1px solid #ddd"}}>{user.user_email}</td>
              <td style={{padding: "10px", border: "1px solid #ddd", color: user.role === "admin" ? "red" : "blue"}}>
                {user.role || "user"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{marginTop: "20px"}}>
        <Link to="/dashboard" className="btn btn-secondary" style={{marginRight: "10px"}}>
          Back to Dashboard
        </Link>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to="/login" replace />} 
          />
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin" 
            element={isAuthenticated && isAdmin() ? <AdminPage /> : <Navigate to="/dashboard" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;