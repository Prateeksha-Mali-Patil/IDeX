const express = require("express");

const {
  healthCheck,
  databaseTest
} = require("../controllers/healthController");

const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/health", healthCheck);

router.get(
  "/db-test",
  authenticateToken,
  databaseTest
);

module.exports = router;