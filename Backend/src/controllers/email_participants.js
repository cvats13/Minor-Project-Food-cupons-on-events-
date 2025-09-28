const db = require("../config/db");
const transporter = require("../config/mail");

// Send emails to all checked-in participants
const sendEmailsToCheckedIn = (req, res) => {
  db.query("SELECT name, email FROM participants WHERE check_in = 'Yes'", (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });

    if (results.length === 0) {
      return res.json({ message: "No participants have checked in yet." });
    }

    results.forEach((row) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: row.email,
        subject: "Thank you for Checking In 🎉",
        text: `Hello ${row.name},\n\nThanks for checking in at our event. We're excited to have you!`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(`❌ Failed to send email to ${row.email}:`, error);
        } else {
          console.log(`✅ Email sent to ${row.email}:`, info.response);
        }
      });
    });

    res.json({ message: `Emails are being sent to ${results.length} checked-in participants.` });
  });
};

module.exports = { sendEmailsToCheckedIn };
