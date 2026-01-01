//handles registration, login , and passing of token 
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("db");
const bcrypt = require("bcrypt");
const jwt = require("jwt"); 

app.use(express.json());
app.use(cors());

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
          const newUser = await pool.query("INSET INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);

          const token = jwt.sign({user: newUser.rows.user_id}, "3lcV6vHNKwLZ1V3KtcUNO3DBvCtHUgUqbZiuAW4kn2k");
          res.json(token);
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
        const token = jwt.sign({user: user.rows[0].user_id}, "3lcV6vHNKwLZ1V3KtcUNO3DBvCtHUgUqbZiuAW4kn2k");
        res.json({ token });
    } catch(err){
        res.status(500).send("server error");
    }
});

app.listen(5000, () =>{
    console.log("server is running on port 5000");
})