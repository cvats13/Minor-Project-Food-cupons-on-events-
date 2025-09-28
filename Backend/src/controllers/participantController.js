// const xlsx = require("xlsx");
// const db = require("../config/db");

// // Upload Excel & insert into DB (with duplicate prevention)
// const uploadExcel = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const filePath = req.file.path;

//     // Read Excel file
//     const workbook = xlsx.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];

//     if (!sheetName) {
//       return res.status(400).json({ error: "Excel file is empty or invalid" });
//     }

//     // Convert sheet to JSON
//     let sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
//       defval: null,
//       raw: false,
//     });

//     if (sheetData.length === 0) {
//       return res.status(400).json({ error: "Excel sheet has no rows" });
//     }

//     // Normalize headers (case-insensitive, remove spaces)
//     const normalize = (key) =>
//       key.toString().trim().toLowerCase().replace(/\s+/g, "");

//     const requiredHeaders = ["teamname", "name", "email", "checkin"];
//     const fileHeaders = Object.keys(sheetData[0]).map(normalize);

//     const missingHeaders = requiredHeaders.filter(
//       (h) => !fileHeaders.includes(h)
//     );

//     if (missingHeaders.length > 0) {
//       return res.status(400).json({
//         error: "Invalid Excel format",
//         expectedHeaders: requiredHeaders,
//         missingHeaders,
//       });
//     }

//     // Normalize rows → consistent object keys
//     sheetData = sheetData.map((row) => {
//       const normalizedRow = {};
//       for (const key in row) {
//         normalizedRow[normalize(key)] = row[key];
//       }
//       return normalizedRow;
//     });

//     let insertCount = 0;
//     let errorCount = 0;

//     for (let [index, row] of sheetData.entries()) {
//       const { teamname, name, email, checkin } = row;

//       if (!teamname || !name || !email || !checkin) {
//         errorCount++;
//         console.warn(`⚠️ Missing fields in row ${index + 2}, skipping...`);
//         continue;
//       }

//       try {
//         await new Promise((resolve, reject) => {
//           db.query(
//             // ✅ Use INSERT IGNORE to skip duplicates
//             "INSERT IGNORE INTO participants (team_name, name, email, check_in) VALUES (?, ?, ?, ?)",
//             [teamname, name, email, checkin],
//             (err, result) => {
//               if (err) {
//                 console.error(`❌ DB Error in row ${index + 2}:`, err.message);
//                 errorCount++;
//                 reject(err);
//               } else {
//                 if (result.affectedRows > 0) {
//                   insertCount++;
//                 } else {
//                   console.log(
//                     `⚠️ Duplicate skipped for ${teamname} - ${email}`
//                   );
//                 }
//                 resolve();
//               }
//             }
//           );
//         });
//       } catch (err) {
//         console.error(`❌ Error inserting row ${index + 2}:`, err.message);
//       }
//     }

//     res.json({
//       message: "Excel processed",
//       inserted: insertCount,
//       errors: errorCount,
//     });
//   } catch (error) {
//     console.error("❌ Upload error:", error);
//     res.status(500).json({ error: "Server error while processing Excel file" });
//   }
// };

// // Fetch all participants
// const getParticipants = async (req, res) => {
//   try {
//     db.query("SELECT * FROM participants", (err, results) => {
//       if (err) {
//         console.error("❌ DB Fetch Error:", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       res.json(results);
//     });
//   } catch (error) {
//     console.error("❌ getParticipants error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // Fetch participants of a particular team
// const getTeamParticipants = async (req, res) => {
//   try {
//     const { teamName } = req.params;

//     if (!teamName) {
//       return res.status(400).json({ error: "Team name is required" });
//     }

//     db.query(
//       "SELECT * FROM participants WHERE LOWER(REPLACE(team_name, ' ', '')) = LOWER(REPLACE(?, ' ', ''))",
//       [teamName],
//       (err, results) => {
//         if (err) {
//           console.error("❌ DB Fetch Error:", err);
//           return res.status(500).json({ error: "Database error" });
//         }

//         if (results.length === 0) {
//           return res
//             .status(404)
//             .json({ message: `No participants found for team ${teamName}` });
//         }

//         res.json(results);
//       }
//     );
//   } catch (error) {
//     console.error("❌ getTeamParticipants error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// module.exports = { uploadExcel, getParticipants, getTeamParticipants };


const xlsx = require("xlsx");
const db = require("../config/db");

// 🔹 Generate random 12-char token
function generateTokenId(teamName, name, email) {
  function getRandomChars(str, count) {
    if (!str) return "";
    let result = "";
    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * str.length);
      result += str[index].toUpperCase();
    }
    return result;
  }

  const part1 = getRandomChars(teamName, 3);
  const part2 = getRandomChars(name, 3);
  const part3 = getRandomChars(email, 3);
  const random = Math.floor(100 + Math.random() * 900); // 3 random digits

  return (part1 + part2 + part3 + random).substring(0, 12);
}

// 🔹 Ensure unique token_id (retry if duplicate exists)
async function getUniqueToken(db, teamName, name, email) {
  let token;
  let isUnique = false;

  while (!isUnique) {
    token = generateTokenId(teamName, name, email);

    const [rows] = await new Promise((resolve, reject) => {
      db.query("SELECT id FROM participants WHERE token_id = ?", [token], (err, result) => {
        if (err) reject(err);
        else resolve([result]);
      });
    });

    if (rows.length === 0) {
      isUnique = true;
    }
  }

  return token;
}

// Upload Excel & insert into DB (with duplicate prevention + token_id)
const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      return res.status(400).json({ error: "Excel file is empty or invalid" });
    }

    let sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
      defval: null,
      raw: false,
    });

    if (sheetData.length === 0) {
      return res.status(400).json({ error: "Excel sheet has no rows" });
    }

    const normalize = (key) =>
      key.toString().trim().toLowerCase().replace(/\s+/g, "");

    const requiredHeaders = ["teamname", "name", "email", "checkin"];
    const fileHeaders = Object.keys(sheetData[0]).map(normalize);

    const missingHeaders = requiredHeaders.filter(
      (h) => !fileHeaders.includes(h)
    );

    if (missingHeaders.length > 0) {
      return res.status(400).json({
        error: "Invalid Excel format",
        expectedHeaders: requiredHeaders,
        missingHeaders,
      });
    }

    sheetData = sheetData.map((row) => {
      const normalizedRow = {};
      for (const key in row) {
        normalizedRow[normalize(key)] = row[key];
      }
      return normalizedRow;
    });

    let insertCount = 0;
    let errorCount = 0;

    for (let [index, row] of sheetData.entries()) {
      const { teamname, name, email, checkin } = row;

      if (!teamname || !name || !email || !checkin) {
        errorCount++;
        console.warn(`⚠️ Missing fields in row ${index + 2}, skipping...`);
        continue;
      }

      try {
        // 🔹 Generate unique token for new participant
        const token_id = await getUniqueToken(db, teamname, name, email);

        await new Promise((resolve, reject) => {
          db.query(
            "INSERT IGNORE INTO participants (team_name, name, email, check_in, token_id) VALUES (?, ?, ?, ?, ?)",
            [teamname, name, email, checkin, token_id],
            (err, result) => {
              if (err) {
                console.error(`❌ DB Error in row ${index + 2}:`, err.message);
                errorCount++;
                reject(err);
              } else {
                if (result.affectedRows > 0) {
                  insertCount++;
                } else {
                  console.log(`⚠️ Duplicate skipped for ${teamname} - ${email}`);
                }
                resolve();
              }
            }
          );
        });
      } catch (err) {
        console.error(`❌ Error inserting row ${index + 2}:`, err.message);
      }
    }

    res.json({
      message: "Excel processed",
      inserted: insertCount,
      errors: errorCount,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: "Server error while processing Excel file" });
  }
};

// Fetch all participants
const getParticipants = async (req, res) => {
  try {
    db.query("SELECT * FROM participants", (err, results) => {
      if (err) {
        console.error("❌ DB Fetch Error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("❌ getParticipants error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch participants of a particular team
const getTeamParticipants = async (req, res) => {
  try {
    const { teamName } = req.params;

    if (!teamName) {
      return res.status(400).json({ error: "Team name is required" });
    }

    db.query(
      "SELECT * FROM participants WHERE LOWER(REPLACE(team_name, ' ', '')) = LOWER(REPLACE(?, ' ', ''))",
      [teamName],
      (err, results) => {
        if (err) {
          console.error("❌ DB Fetch Error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: `No participants found for team ${teamName}` });
        }

        res.json(results);
      }
    );
  } catch (error) {
    console.error("❌ getTeamParticipants error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { uploadExcel, getParticipants, getTeamParticipants };

