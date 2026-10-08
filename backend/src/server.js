
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const prisma = require("./lib/prisma");

const app = express();

const ML_SERVICE_URL =
  process.env.IDEX_RISK_ENGINE_URL || "http://localhost:8000";

// =========================================================
// MIDDLEWARE
// =========================================================

app.use(cors());
app.use(express.json());

// =========================================================
// HEALTH
// =========================================================

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "IDeX Backend",
  });
});

// =========================================================
// DATABASE TEST
// =========================================================

app.get("/db-test", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT 1 AS connected
    `;

    const safeResult = result.map((row) => ({
      connected: Number(row.connected),
    }));

    res.json({
      status: "OK",
      database: "MySQL",
      prisma: "Connected",
      result: safeResult,
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);

    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed",
    });
  }
});

// =========================================================
// IDENTITIES
// =========================================================

// Get all identities
app.get("/api/identities", async (req, res) => {
  try {
    const identities = await prisma.identity.findMany();
    res.json(identities);
  } catch (error) {
    console.error("Failed to fetch identities:", error.message);

    res.status(500).json({
      message: "Failed to fetch identities",
    });
  }
});

// Get a specific identity
app.get("/api/identities/:identityId", async (req, res) => {
  try {
    const { identityId } = req.params;

    const identity = await prisma.identity.findUnique({
      where: { id: identityId },
      include: {
        devices: {
          include: { device: true },
        },
        ips: {
          include: { ip: true },
        },
        indicators: true,
        relationships: true,
      },
    });

    if (!identity) {
      return res.status(404).json({
        message: "Identity not found",
      });
    }

    res.json(identity);
  } catch (error) {
    console.error("Failed to fetch identity:", error.message);

    res.status(500).json({
      message: "Failed to fetch identity",
    });
  }
});

// =========================================================
// SECURITY EVENTS
// =========================================================

// Get recent security events
app.get("/api/events", async (req, res) => {
  try {
    const events = await prisma.securityEvent.findMany({
      orderBy: { timestamp: "desc" },
      take: 20,
    });

    res.json(events);
  } catch (error) {
    console.error("Failed to fetch security events:", error.message);

    res.status(500).json({
      message: "Failed to fetch security events",
    });
  }
});

// =========================================================
// AUDIT LOGS
// =========================================================

// Get recent audit logs from the database
app.get("/api/audit-logs", async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    res.json(logs);
  } catch (error) {
    console.error("Failed to fetch audit logs:", error.message);

    res.status(500).json({
      message: "Failed to fetch audit logs",
    });
  }
});

// =========================================================
// ML RISK ANALYSIS
// =========================================================

// Send event to FastAPI risk engine
app.post("/api/events/analyze", async (req, res) => {
  try {
    const eventData = req.body;

    const response = await axios.post(
      `${ML_SERVICE_URL}/analyze`,
      eventData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Risk engine request failed:",
      error.response?.data || error.message
    );

    res.status(502).json({
      status: "ERROR",
      message: "Risk analysis service unavailable",
      details: error.response?.data || error.message,
    });
  }
});

// =========================================================
// START SERVER
// =========================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`IDeX Backend running on http://localhost:${PORT}`);
});