const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { name, emailid, username, password } = req.body;

    // 🔹 Validations
    if (!name || !emailid || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // 🔹 Check if username/email already exists
    db.query(
      "SELECT * FROM users WHERE emailid = ? OR username = ?",
      [emailid, username],
      async (err, results) => {
        if (err) {
          console.error("❌ DB error:", err.message);
          return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
          return res.status(400).json({ error: "Email or Username already exists" });
        }

        // 🔹 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔹 Insert new user
        db.query(
          "INSERT INTO users (name, emailid, username, password) VALUES (?, ?, ?, ?)",
          [name, emailid, username, hashedPassword],
          (err, result) => {
            if (err) {
              console.error("❌ Insert error:", err.message);
              return res.status(500).json({ error: "Error creating user" });
            }
            res.status(201).json({ message: "✅ User registered successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
