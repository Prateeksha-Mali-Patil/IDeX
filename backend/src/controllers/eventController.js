const axios = require("axios");
const prisma = require("../lib/prisma");

const IDEXX_RISK_ENGINE_URL =
  process.env.IDEX_RISK_ENGINE_URL || "http://localhost:8000";

const analyzeEvent = async (req, res) => {
  try {
    const event = req.body;

    // Validate required event fields
    if (!event.eventId || !event.userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "eventId and userId are required"
      });
    }

    // Verify that the identity exists
    const identity = await prisma.identity.findUnique({
      where: {
        id: event.userId
      }
    });

    if (!identity) {
      return res.status(404).json({
        status: "ERROR",
        message: "Identity not found"
      });
    }

    console.log(
      `[IDeX] Sending event ${event.eventId} to risk engine`
    );

    // Send event to Rakshitha's FastAPI service
    const response = await axios.post(
      `${IDEXX_RISK_ENGINE_URL}/analyze`,
      event,
      {
        timeout: 5000,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const analysis = response.data;

    // Save security event result
    const securityEvent = await prisma.securityEvent.upsert({
      where: {
        eventId: event.eventId
      },
      update: {
        riskScore: analysis.riskScore ?? null,
        decision: analysis.decision ?? null
      },
      create: {
        eventId: event.eventId,
        identityId: event.userId,
        timestamp: new Date(event.timestamp || Date.now()),
        ip: event.ip || null,
        deviceId: event.deviceId || null,
        location: event.location || null,
        userAgent: event.userAgent || null,
        failedLogins: event.failedLogins || 0,
        loginVelocity: event.loginVelocity || 0,
        riskScore: analysis.riskScore ?? null,
        decision: analysis.decision ?? null
      }
    });

    // Persist returned risk indicators
    if (Array.isArray(analysis.indicators)) {
      await prisma.riskIndicator.deleteMany({
        where: {
          identityId: event.userId
        }
      });

      if (analysis.indicators.length > 0) {
        await prisma.riskIndicator.createMany({
          data: analysis.indicators.map((indicator) => ({
            identityId: event.userId,
            name: indicator.name || "Unknown Indicator",
            score: indicator.score || 0,
            severity: indicator.severity || "MEDIUM",
            evidence: indicator.evidence || null
          }))
        });
      }
    }

    // Create audit record
    await prisma.auditLog.create({
      data: {
        action: "SECURITY_EVENT_ANALYZED",
        actor: req.user?.email || "SYSTEM",
        details: JSON.stringify({
          eventId: event.eventId,
          identityId: event.userId,
          riskScore: analysis.riskScore,
          riskLevel: analysis.riskLevel,
          decision: analysis.decision
        })
      }
    });

    return res.json({
      status: "OK",
      message: "Security event analyzed successfully",
      securityEvent,
      analysis
    });
  } catch (error) {
    console.error(
      "[IDeX] Event analysis failed:",
      error.response?.data || error.message
    );

    return res.status(503).json({
      status: "ERROR",
      message: "IDeX risk analysis service unavailable"
    });
  }
};

module.exports = {
  analyzeEvent
};