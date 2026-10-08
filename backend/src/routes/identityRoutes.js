const express = require("express");

const {
  getIdentities,
  getIdentityById
} = require("../controllers/identityController");

const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  getIdentities
);

router.get(
  "/:identityId",
  authenticateToken,
  getIdentityById
);

module.exports = router;