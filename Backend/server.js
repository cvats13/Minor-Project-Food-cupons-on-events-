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
const participantRoutes= require("./src/routes/participantRoutes")
const emailRoutes = require("./src/routes/emailRoutes");

// Use routes
app.use("/auth", authRoutes);
app.use("/participants",participantRoutes)
app.use("/emails", emailRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
