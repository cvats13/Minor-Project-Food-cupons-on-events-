const express = require("express");
const router = express.Router();

// Route for "/"
router.get("/", (req, res) => {
  res.send("Hello from Express Server 🚀");
});

// Route for "/server"
router.get("/server", (req, res) => {
  res.send("Hello I am the main server 😎");
});

module.exports = router;
