const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prisma = require("./lib/prisma");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "IDeX Backend"
  });
});

// Database connection test
app.get("/db-test", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT 1 AS connected`;

    const safeResult = result.map((row) => ({
      connected: Number(row.connected)
    }));

    res.json({
      status: "OK",
      database: "MySQL",
      prisma: "Connected",
      result: safeResult
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`IDeX Backend running on http://localhost:${PORT}`);
});