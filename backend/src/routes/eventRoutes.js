const express = require("express");

const {
  analyzeEvent
} = require("../controllers/eventController");

const {
  authenticateToken
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/analyze",
  authenticateToken,
  analyzeEvent
);

module.exports = router;