const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // 1. Check empty fields
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Validate name length
    if (name.length > 20) {
      return res.status(400).json({ message: "Name must not exceed 20 characters" });
    }

    // 3. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 4. Check if username already exists
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkUserQuery, [username], async (err, results) => {
      if (err) {
        console.error("Error checking username:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // 5. Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 6. Insert new user
      const insertQuery =
        "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)";

      db.query(insertQuery, [name, username, email, hashedPassword], (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res.status(500).json({ message: "Database error" });
        }

        res.status(201).json({
          message: "User registered successfully 🚀",
          userId: result.insertId,
          name,
          username,
          email,
        });
      });
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if user exists
    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
      try {
        if (err) {
          console.error("❌ Database error during signin:", err);
          return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
          message: "Signin successful 🎉"
        });
      } catch (error) {
        console.error("❌ Error during signin process:", error);
        res.status(500).json({ message: "Something went wrong while signing in" });
      }
    });
  } catch (error) {
    console.error("❌ Unexpected error in signin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { signup,signin };
