const dotenv = require("dotenv");
const mysql = require("mysql2");

// Load .env
dotenv.config();

let db;

try {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  });

  db.connect((err) => {
    if (err) {
      console.error("❌ Database connection failed:", err.message);
      process.exit(1); // stop the server safely
    } else {
      console.log("✅ MySQL Connected!");
    }
  });

  // Handle unexpected disconnects
  db.on("error", (err) => {
    console.error("⚠️ MySQL Error:", err.message);

    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("🔄 Reconnecting to MySQL...");
      setTimeout(() => {
        process.exit(1); // Restart server using nodemon/pm2
      }, 2000);
    } else {
      throw err;
    }
  });

} catch (error) {
  console.error("🔥 Fatal DB Error:", error.message);
  process.exit(1);
}

module.exports = db;
