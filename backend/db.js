require("dotenv").config(); // Load the .env file
const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true, // Neon requires SSL
  },
});

module.exports = pool;