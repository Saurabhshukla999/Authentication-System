// This file helps us read information from the token
// Think of it like a special decoder that reads ID cards

// This function reads the token and tells us what role the user has
export const getRoleFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // JWT tokens have 3 parts separated by dots: header.payload.signature
    // We need the middle part (payload) which has the user info
    const payload = token.split(".")[1];
    // Decode it (it's in base64, so we need to decode it)
    const decoded = JSON.parse(atob(payload));
    return decoded.role; // Return the role (like "user" or "admin")
  } catch (err) {
    return null;
  }
};

// This function checks if the current user is an admin
export const isAdmin = () => {
  const role = getRoleFromToken();
  return role === "admin";
};

// This function gets the user ID from the token
export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.user;
  } catch (err) {
    return null;
  }
};

