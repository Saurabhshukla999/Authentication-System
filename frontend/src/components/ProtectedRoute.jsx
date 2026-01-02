// ============================================
// PROTECTED ROUTE COMPONENT
// ============================================
// This is like a security guard for React pages!
// It checks if you're logged in before showing the page

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requireAdmin = false }) {
  // Get the token from storage (like checking for an ID card)
  const token = localStorage.getItem("token");
  
  // If no token, you're not logged in!
  if (!token) {
    // Redirect to login (like sending them to the front door)
    return <Navigate to="/login" replace />;
  }

  // If this route requires admin, check the role
  if (requireAdmin) {
    try {
      // Decode the token to check the role
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      const role = decoded.role;

      // If not admin, redirect to dashboard
      if (role !== "admin") {
        return <Navigate to="/dashboard" replace />;
      }
    } catch (err) {
      // If token is broken, redirect to login
      return <Navigate to="/login" replace />;
    }
  }

  // If you passed all checks, show the page!
  return children;
}

export default ProtectedRoute;

