const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json({
      totalCustomers: 10,
      totalTickets: 25,
      openTickets: 5,
      resolvedTickets: 20,
      priorityData: {
        low: 10,
        medium: 8,
        high: 7,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;