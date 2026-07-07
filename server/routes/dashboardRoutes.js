const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

// Protect all dashboard routes
router.use(auth);

// GET Dashboard Statistics
router.get("/", getDashboardStats);

module.exports = router;