const prisma = require("../lib/prisma");

const healthCheck = (req, res) => {
  res.json({
    status: "OK",
    service: "IDeX Backend"
  });
};

const databaseTest = async (req, res) => {
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
};

module.exports = {
  healthCheck,
  databaseTest
};