const express = require("express");

const {
  getAuditLogs
} = require("../controllers/auditController");

const {
  authenticateToken
} = require("../middleware/authMiddleware");

const {
  authorizeRoles
} = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getAuditLogs
);

module.exports = router;