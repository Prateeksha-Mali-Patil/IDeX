const prisma = require("../lib/prisma");

const getDashboardSummary = async (req, res) => {
  try {
    const [
      totalIdentities,
      totalEvents,
      reviewEvents,
      highRiskEvents,
      criticalEvents,
      recentEvents
    ] = await Promise.all([
      prisma.identity.count(),

      prisma.securityEvent.count(),

      prisma.securityEvent.count({
        where: {
          decision: {
            in: ["REVIEW", "CHALLENGE"]
          }
        }
      }),

      prisma.securityEvent.count({
        where: {
          riskScore: {
            gte: 61,
            lte: 80
          }
        }
      }),

      prisma.securityEvent.count({
        where: {
          riskScore: {
            gte: 81
          }
        }
      }),

      prisma.securityEvent.findMany({
        orderBy: {
          timestamp: "desc"
        },
        take: 10,
        select: {
          eventId: true,
          identityId: true,
          timestamp: true,
          riskScore: true,
          decision: true,
          ip: true,
          deviceId: true,
          location: true
        }
      })
    ]);

    res.json({
      status: "OK",
      summary: {
        totalIdentities,
        totalEvents,
        reviewEvents,
        highRiskEvents,
        criticalEvents
      },
      recentEvents
    });
  } catch (error) {
    console.error("Failed to fetch dashboard summary:", error);

    res.status(500).json({
      status: "ERROR",
      message: "Failed to fetch dashboard summary"
    });
  }
};

module.exports = {
  getDashboardSummary
};