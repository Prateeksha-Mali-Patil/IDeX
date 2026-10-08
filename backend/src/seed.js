
require("dotenv").config();

const prisma = require("./lib/prisma");

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: "analyst@idex.local",
    },
    update: {},
    create: {
      email: "analyst@idex.local",
      password: "demo-password",
      role: "ANALYST",
    },
  });

  // =========================================================
  // DEMO IDENTITIES
  // =========================================================

  const identities = [
    "ID-001",
    "ID-019",
    "ID-023",
    "ID-025",
    "ID-032",
    "ID-047",
    "ID-081",
  ];

  for (const identityId of identities) {
    await prisma.identity.upsert({
      where: {
        id: identityId,
      },
      update: {},
      create: {
        id: identityId,
        userId: user.id,
        status: "ACTIVE",
      },
    });
  }

  // =========================================================
  // DEVICES
  // =========================================================

  const devices = [
    "D-001",
    "D-003",
    "D-005",
    "D-007",
    "D-009",
    "D-011",
    "D-014",
  ];

  for (const deviceId of devices) {
    await prisma.device.upsert({
      where: {
        id: deviceId,
      },
      update: {},
      create: {
        id: deviceId,
      },
    });
  }

  // =========================================================
  // IP ADDRESSES
  // =========================================================

  const ips = [
    ["IP-001", "10.0.0.11"],
    ["IP-003", "10.0.0.23"],
    ["IP-005", "10.0.0.35"],
    ["IP-007", "10.0.0.47"],
    ["IP-012", "192.168.1.100"],
    ["IP-014", "10.0.0.61"],
    ["IP-018", "10.0.0.81"],
  ];

  for (const [id, address] of ips) {
    await prisma.iPAddress.upsert({
      where: {
        address,
      },
      update: {},
      create: {
        id,
        address,
      },
    });
  }

  // =========================================================
  // CONNECT IDENTITIES TO DEVICES AND IPS
  // =========================================================

  const connections = [
    ["ID-001", "D-001", "IP-001"],
    ["ID-019", "D-003", "IP-003"],
    ["ID-023", "D-005", "IP-005"],
    ["ID-025", "D-007", "IP-007"],
    ["ID-047", "D-009", "IP-012"],
    ["ID-032", "D-011", "IP-014"],
    ["ID-081", "D-014", "IP-018"],
  ];

  for (const [identityId, deviceId, ipId] of connections) {
    await prisma.identityDevice.upsert({
      where: {
        identityId_deviceId: {
          identityId,
          deviceId,
        },
      },
      update: {},
      create: {
        identityId,
        deviceId,
      },
    });

    await prisma.identityIP.upsert({
      where: {
        identityId_ipId: {
          identityId,
          ipId,
        },
      },
      update: {},
      create: {
        identityId,
        ipId,
      },
    });
  }

  // =========================================================
  // RISK INDICATORS
  // =========================================================

  await prisma.riskIndicator.deleteMany();

  await prisma.riskIndicator.createMany({
    data: [
      {
        identityId: "ID-047",
        name: "FAILED_AUTHENTICATION",
        score: 25,
        severity: "HIGH",
        evidence: "5 failed login attempts detected.",
      },
      {
        identityId: "ID-047",
        name: "HIGH_LOGIN_VELOCITY",
        score: 15,
        severity: "HIGH",
        evidence: "Login velocity is 8 attempts per minute.",
      },
      {
        identityId: "ID-047",
        name: "BEHAVIOUR_ANOMALY",
        score: 20,
        severity: "HIGH",
        evidence:
          "User behaviour differs significantly from the expected activity pattern.",
      },
      {
        identityId: "ID-025",
        name: "NEW_DEVICE",
        score: 15,
        severity: "MEDIUM",
        evidence:
          "Identity accessed from a previously unseen device.",
      },
      {
        identityId: "ID-025",
        name: "UNUSUAL_LOCATION",
        score: 20,
        severity: "MEDIUM",
        evidence: "Login originated from an unusual location.",
      },
      {
        identityId: "ID-019",
        name: "MINOR_ANOMALY",
        score: 10,
        severity: "LOW",
        evidence: "Minor deviation from normal login behaviour.",
      },
      {
        identityId: "ID-081",
        name: "FAILED_AUTHENTICATION",
        score: 30,
        severity: "HIGH",
        evidence:
          "Multiple failed authentication attempts detected.",
      },
      {
        identityId: "ID-081",
        name: "BEHAVIOUR_ANOMALY",
        score: 25,
        severity: "HIGH",
        evidence: "Significant behavioural deviation detected.",
      },
      {
        identityId: "ID-023",
        name: "HIGH_LOGIN_VELOCITY",
        score: 20,
        severity: "MEDIUM",
        evidence:
          "Login activity is occurring at an elevated velocity.",
      },
      {
        identityId: "ID-032",
        name: "UNUSUAL_TIME",
        score: 10,
        severity: "LOW",
        evidence:
          "Login occurred outside the usual activity window.",
      },
    ],
  });

  // =========================================================
  // IDENTITY RELATIONSHIPS
  // =========================================================

  await prisma.relationship.deleteMany();

  await prisma.relationship.createMany({
    data: [
      {
        identityId: "ID-047",
        relatedId: "ID-025",
        relationshipType: "SHARED_DEVICE",
        weight: 3,
      },
      {
        identityId: "ID-047",
        relatedId: "ID-019",
        relationshipType: "SHARED_IP",
        weight: 2,
      },
      {
        identityId: "ID-025",
        relatedId: "ID-081",
        relationshipType: "SHARED_IP",
        weight: 2,
      },
    ],
  });

  // =========================================================
  // SECURITY EVENTS
  // =========================================================

  await prisma.securityEvent.deleteMany();

  await prisma.securityEvent.createMany({
    data: [
      {
        eventId: "EVT-90421",
        identityId: "ID-047",
        timestamp: new Date(Date.now() - 12 * 1000),
        ip: "192.168.1.100",
        deviceId: "D-009",
        location: "Bengaluru, IN",
        userAgent: "Chrome / Windows",
        failedLogins: 5,
        loginVelocity: 8,
        riskScore: 91,
        decision: "BLOCK / REVIEW",
      },
      {
        eventId: "EVT-90420",
        identityId: "ID-025",
        timestamp: new Date(Date.now() - 60 * 1000),
        ip: "10.0.0.47",
        deviceId: "D-007",
        location: "Mumbai, IN",
        userAgent: "Chrome / Windows",
        failedLogins: 2,
        loginVelocity: 4,
        riskScore: 56,
        decision: "CHALLENGE",
      },
      {
        eventId: "EVT-90419",
        identityId: "ID-001",
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
        ip: "10.0.0.11",
        deviceId: "D-001",
        location: "Bengaluru, IN",
        userAgent: "Chrome / Windows",
        failedLogins: 0,
        loginVelocity: 1,
        riskScore: 18,
        decision: "ALLOW",
      },
      {
        eventId: "EVT-90418",
        identityId: "ID-081",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        ip: "10.0.0.81",
        deviceId: "D-014",
        location: "Delhi, IN",
        userAgent: "Firefox / Linux",
        failedLogins: 6,
        loginVelocity: 9,
        riskScore: 76,
        decision: "BLOCK / REVIEW",
      },
      {
        eventId: "EVT-90417",
        identityId: "ID-023",
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        ip: "10.0.0.35",
        deviceId: "D-005",
        location: "Hyderabad, IN",
        userAgent: "Edge / Windows",
        failedLogins: 1,
        loginVelocity: 5,
        riskScore: 48,
        decision: "CHALLENGE",
      },
      {
        eventId: "EVT-90416",
        identityId: "ID-019",
        timestamp: new Date(Date.now() - 11 * 60 * 1000),
        ip: "10.0.0.23",
        deviceId: "D-003",
        location: "Bengaluru, IN",
        userAgent: "Chrome / Windows",
        failedLogins: 1,
        loginVelocity: 2,
        riskScore: 24,
        decision: "ALLOW",
      },
      {
        eventId: "EVT-90415",
        identityId: "ID-032",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        ip: "10.0.0.61",
        deviceId: "D-011",
        location: "Chennai, IN",
        userAgent: "Safari / macOS",
        failedLogins: 0,
        loginVelocity: 2,
        riskScore: 29,
        decision: "ALLOW",
      },
    ],
  });

  // =========================================================
  // DEMO AUDIT LOGS
  // =========================================================

  // Remove only our known demo audit records so rerunning
  // this seed does not add duplicates.
  const demoAuditActions = [
    "Risk analysis completed",
    "Investigation opened",
    "Identity relationship detected",
    "Authentication event received",
    "Behaviour anomaly detected",
  ];

  await prisma.auditLog.deleteMany({
    where: {
      action: {
        in: demoAuditActions,
      },
      actor: {
        in: ["IDeX Engine", "Analyst", "Security Plugin"],
      },
    },
  });

  await prisma.auditLog.createMany({
    data: [
      {
        actor: "IDeX Engine",
        action: "Risk analysis completed",
        details: "ID-047 - Risk score 91 - BLOCK / REVIEW",
      },
      {
        actor: "Analyst",
        action: "Investigation opened",
        details: "ID-047",
      },
      {
        actor: "IDeX Engine",
        action: "Identity relationship detected",
        details: "ID-047 - Shared device with ID-025",
      },
      {
        actor: "Security Plugin",
        action: "Authentication event received",
        details: "EVT-90420",
      },
      {
        actor: "IDeX Engine",
        action: "Behaviour anomaly detected",
        details: "ID-081 - Risk score 76",
      },
    ],
  });

  console.log("IDeX demo data created successfully.");
  console.log("Demo identities:", identities.join(", "));
  console.log("Demo security events: 7");
  console.log("Demo audit logs: 5");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });