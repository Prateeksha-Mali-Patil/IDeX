const axios = require("axios");

const IDEXX_RISK_ENGINE_URL =
  process.env.IDEX_RISK_ENGINE_URL || "http://localhost:8000";

const idexSecurityMiddleware = async (req, res, next) => {
  try {
    // Only analyze requests that explicitly carry an IDeX security event.
    if (!req.body || !req.body.idexEvent) {
      return next();
    }

    const event = req.body.idexEvent;

    // Basic event validation.
    if (!event.eventId || !event.userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Invalid IDeX security event"
      });
    }

    console.log(
      `[IDeX] Analyzing security event ${event.eventId} for ${event.userId}`
    );

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

    // Attach the security decision to the request.
    req.idexAnalysis = analysis;

    // Security policy:
    // LOW / MEDIUM risk -> continue normally.
    // HIGH / CRITICAL -> expose the decision to the host application.
    //
    // We do not automatically accuse the identity of fraud.
    // The decision is based on correlated risk indicators.
    if (
      analysis.riskLevel === "CRITICAL" &&
      analysis.decision === "BLOCK"
    ) {
      return res.status(403).json({
        status: "BLOCKED",
        message: "Request blocked by IDeX security policy",
        securityAnalysis: analysis
      });
    }

    if (
      analysis.riskLevel === "HIGH" ||
      analysis.decision === "REVIEW" ||
      analysis.decision === "CHALLENGE"
    ) {
      req.idexSecurityAction = analysis.decision;

      console.warn(
        `[IDeX] Elevated risk detected: ${event.userId} -> ` +
        `${analysis.riskScore} (${analysis.riskLevel})`
      );
    }

    next();
  } catch (error) {
    console.error(
      "[IDeX] Security middleware error:",
      error.response?.data || error.message
    );

    // Fail closed for security-analysis failures.
    return res.status(503).json({
      status: "ERROR",
      message: "IDeX security analysis unavailable"
    });
  }
};

module.exports = {
  idexSecurityMiddleware
};