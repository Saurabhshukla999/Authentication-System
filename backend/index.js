//handles registration, login , and passing of token 
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

app.use(express.json());
app.use(cors());

// ============================================
// MIDDLEWARE - This is like a security guard!
// ============================================
// This function checks if someone is logged in (has a token)
const verifyToken = (req, res, next) => {
  // Get the token from the request (like checking their ID card)
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN" -> "TOKEN"
  
  if (!token) {
    return res.status(403).json("You need a token to enter!");
  }

  try {
    // Decode the token to see who they are and what role they have
    const decoded = jwt.verify(token, "3lcV6vHNKwLZ1V3KtcUNO3DBvCtHUgUqbZiuAW4kn2k");
    req.user = decoded; // Save user info for later use
    next(); // Let them through!
  } catch (err) {
    return res.status(403).json("Invalid token!");
  }
};

// This function checks if someone is an ADMIN (like checking if they have a teacher badge)
const isAdmin = (req, res, next) => {
  // First check if they're logged in
  verifyToken(req, res, () => {
    // Check if their role is "admin"
    if (req.user.role === "admin") {
      next(); // They're an admin, let them through!
    } else {
      res.status(403).json("Only admins can access this!"); // Not an admin, block them!
    }
  });
};

app.post("/auth/register", async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email,
          ]);

          if(user.rows.length > 0){
            return res.status(401).json("user already exist");
          }

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          // Give everyone "user" role by default (like giving them a student badge)
          const defaultRole = "user";
          const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password, role) VALUES ($1, $2, $3, $4) RETURNING *", [name, email, hashedPassword, defaultRole]);

          // Put the role in the token (like writing it on their ID card)
          const token = jwt.sign({user: newUser.rows[0].user_id, role: defaultRole}, "3lcV6vHNKwLZ1V3KtcUNO3DBvCtHUgUqbZiuAW4kn2k");
          res.json({ token });
    } catch(err){
        res.status(500).send("server error");
    }
});

app.post("/auth/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if(user.rows.length === 0){
            return res.status(401).json("password or email is incorrect");
        };
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }
        // Get the user's role (or "user" if they don't have one yet)
        const userRole = user.rows[0].role || "user";
        // Put the role in the token (like writing their badge on their ID card)
        const token = jwt.sign({user: user.rows[0].user_id, role: userRole}, "3lcV6vHNKwLZ1V3KtcUNO3DBvCtHUgUqbZiuAW4kn2k");
        res.json({ token });
    } catch(err){
        res.status(500).send("server error");
    }
});

// ============================================
// ROUTES - These are like different rooms in a building
// ============================================

// This route tells you who YOU are (like checking your own ID card)
app.get("/auth/me", verifyToken, async (req, res) => {
  try {
    // Get your user info from the database
    const user = await pool.query("SELECT user_id, user_name, user_email, role FROM users WHERE user_id = $1", [req.user.user]);
    res.json(user.rows[0]); // Send back your info
  } catch (err) {
    res.status(500).send("server error");
  }
});

// This is the ADMIN ROOM - only admins can enter!
app.get("/admin/users", isAdmin, async (req, res) => {
  try {
    // Only admins can see all users (like a principal seeing all students)
    const allUsers = await pool.query("SELECT user_id, user_name, user_email, role FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    res.status(500).send("server error");
  }
});

app.listen(5000, () =>{
    console.log("server is running on port 5000");
})