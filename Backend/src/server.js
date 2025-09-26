const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Import routes
const mainRoutes = require("../src/routes/mainRoutes");

// Use routes
app.use("/", mainRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
