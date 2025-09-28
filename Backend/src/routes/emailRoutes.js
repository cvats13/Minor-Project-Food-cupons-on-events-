const express = require("express");
const { sendEmailsToCheckedIn } = require("../controllers/email_participants");

const router = express.Router();

// POST /emails/send
router.post("/send", async (req, res) => {
  try {
    await sendEmailsToCheckedIn(req, res);
  } catch (error) {
    console.error("❌ Error in /emails/send route:", error);
    res.status(500).json({ message: "Internal server error while sending emails" });
  }
});

module.exports = router;
