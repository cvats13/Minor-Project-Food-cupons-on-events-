const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/config/db");

const app = express();

// Load .env
dotenv.config();


// Middleware
app.use(express.json());

// Import routes
const authRoutes = require("./src/routes/authRoutes");

// Use routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
