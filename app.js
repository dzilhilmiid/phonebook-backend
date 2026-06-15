const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ================= UPLOADS =================
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
app.use("/uploads", express.static("uploads"));

// ================= HEALTH CHECK (WAJIB) =================
app.get("/", (req, res) => {
  res.send("API OK 🚀");
});

// ================= TEST DB (AMAN) =================
app.get("/test-db", async (req, res) => {
  try {
    const pool = require("./db");
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "DB OK",
      time: result.rows[0],
    });
  } catch (err) {
    console.error("DB ERROR:", err.message);
    res.status(500).json({
      status: "DB ERROR",
      message: err.message,
    });
  }
});

// ================= ROUTES =================
try {
  const phonebookRoutes = require("./routes/phonebookRoutes");
  app.use("/api/phonebooks", phonebookRoutes);
} catch (err) {
  console.error("ROUTE ERROR:", err.message);
}

// ================= PORT RAILWAY =================
const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Running on port ${PORT}`);
});