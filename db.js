require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
});

pool.on("error", (err) => {
  console.error("Unexpected DB error:", err);
});

module.exports = pool;