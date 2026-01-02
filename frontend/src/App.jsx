import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register"; 

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Welcome! You are logged in.</p>
      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;