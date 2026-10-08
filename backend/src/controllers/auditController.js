const prisma = require("../lib/prisma");

const getAuditLogs = async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: {
        createdAt: "desc"
      },
      take: 100
    });

    res.json({
      status: "OK",
      count: logs.length,
      logs
    });
  } catch (error) {
    console.error("Failed to fetch audit logs:", error);

    res.status(500).json({
      status: "ERROR",
      message: "Failed to fetch audit logs"
    });
  }
};

module.exports = {
  getAuditLogs
};