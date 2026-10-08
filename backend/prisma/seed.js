const bcrypt = require("bcrypt");
const prisma = require("../src/lib/prisma");

async function main() {
  console.log("Starting IDeX database seed...");

  // --------------------------------------------------
  // 1. Clean existing demo data
  // --------------------------------------------------

  await prisma.auditLog.deleteMany();
  await prisma.riskIndicator.deleteMany();
  await prisma.securityEvent.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.relationship.deleteMany();
  await prisma.identityDevice.deleteMany();
  await prisma.identityIP.deleteMany();
  await prisma.device.deleteMany();
  await prisma.iPAddress.deleteMany();
  await prisma.identity.deleteMany();

  // --------------------------------------------------
  // 2. Ensure admin analyst account exists
  // --------------------------------------------------

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@idex.local"
    },
    update: {
      password: hashedPassword,
      role: "ADMIN"
    },
    create: {
      email: "admin@idex.local",
      password: hashedPassword,
      role: "ADMIN"
    }
  });

  // --------------------------------------------------
  // 3. Demo identities
  // --------------------------------------------------

  const identities = [
    {
      id: "ID-001",
      userId: admin.id,
      status: "ACTIVE",
      createdAt: new Date("2026-08-15T10:00:00Z")
    },
    {
      id: "ID-025",
      userId: admin.id,
      status: "ACTIVE",
      createdAt: new Date("2026-09-20T11:30:00Z")
    },
    {
      id: "ID-047",
      userId: admin.id,
      status: "ACTIVE",
      createdAt: new Date("2026-10-05T09:15:00Z")
    },
    {
      id: "ID-081",
      userId: admin.id,
      status: "ACTIVE",
      createdAt: new Date("2026-09-18T08:20:00Z")
    },
    {
      id: "ID-023",
      userId: admin.id,
      status: "ACTIVE",
      createdAt: new Date("2026-09-10T14:10:00Z")
    },
    {
      id: "ID-032",
      userId: admin.id,
      status: "ACTIVE",
      createdAt: new Date("2026-09-25T16:45:00Z")
    },
    {
      id: "ID-019",
      userId: admin.id,
      status: "ACTIVE",
      createdAt: new Date("2026-09-05T12:00:00Z")
    }
  ];

  for (const identity of identities) {
    await prisma.identity.create({
      data: identity
    });
  }

  // --------------------------------------------------
  // 4. Devices
  // --------------------------------------------------

  const devices = [
    { id: "D-001" },
    { id: "D-025" },
    { id: "D-009" }
  ];

  for (const device of devices) {
    await prisma.device.create({
      data: device
    });
  }

  // --------------------------------------------------
  // 5. Identity ↔ Device relationships
  // --------------------------------------------------

  const identityDevices = [
    { identityId: "ID-001", deviceId: "D-001" },
    { identityId: "ID-025", deviceId: "D-025" },

    // Suspicious shared device cluster
    { identityId: "ID-047", deviceId: "D-009" },
    { identityId: "ID-081", deviceId: "D-009" },
    { identityId: "ID-023", deviceId: "D-009" },
    { identityId: "ID-032", deviceId: "D-009" },
    { identityId: "ID-019", deviceId: "D-009" }
  ];

  for (const relation of identityDevices) {
    await prisma.identityDevice.create({
      data: relation
    });
  }

  // --------------------------------------------------
  // 6. IP addresses
  // --------------------------------------------------

  const ips = [
    {
      id: "IP-001",
      address: "203.0.113.10"
    },
    {
      id: "IP-025",
      address: "203.0.113.25"
    },
    {
      id: "IP-012",
      address: "198.51.100.12"
    }
  ];

  for (const ip of ips) {
    await prisma.iPAddress.create({
      data: ip
    });
  }

  // --------------------------------------------------
  // 7. Identity ↔ IP relationships
  // --------------------------------------------------

  const identityIps = [
    { identityId: "ID-001", ipId: "IP-001" },
    { identityId: "ID-025", ipId: "IP-025" },

    // Suspicious shared infrastructure
    { identityId: "ID-047", ipId: "IP-012" },
    { identityId: "ID-081", ipId: "IP-012" },
    { identityId: "ID-023", ipId: "IP-012" },
    { identityId: "ID-032", ipId: "IP-012" },
    { identityId: "ID-019", ipId: "IP-012" }
  ];

  for (const relation of identityIps) {
    await prisma.identityIP.create({
      data: relation
    });
  }

  // --------------------------------------------------
  // 8. Behavioral activity
  // --------------------------------------------------

  const activityData = [
    // ID-001: normal baseline
    {
      identityId: "ID-001",
      timestamp: new Date("2026-10-07T08:00:00Z"),
      action: "LOGIN",
      location: "Bengaluru",
      riskScore: 12
    },
    {
      identityId: "ID-001",
      timestamp: new Date("2026-10-07T12:00:00Z"),
      action: "TRANSACTION",
      location: "Bengaluru",
      riskScore: 10
    },

    // ID-025: moderate deviation
    {
      identityId: "ID-025",
      timestamp: new Date("2026-10-07T09:00:00Z"),
      action: "LOGIN",
      location: "Bengaluru",
      riskScore: 42
    },
    {
      identityId: "ID-025",
      timestamp: new Date("2026-10-08T06:00:00Z"),
      action: "LOGIN",
      location: "Mumbai",
      riskScore: 51
    },
    {
      identityId: "ID-025",
      timestamp: new Date("2026-10-08T10:00:00Z"),
      action: "TRANSACTION",
      location: "Mumbai",
      riskScore: 48
    },

    // ID-047: normal baseline followed by major spike
    {
      identityId: "ID-047",
      timestamp: new Date("2026-10-07T08:00:00Z"),
      action: "LOGIN",
      location: "Bengaluru",
      riskScore: 20
    },
    {
      identityId: "ID-047",
      timestamp: new Date("2026-10-07T09:00:00Z"),
      action: "TRANSACTION",
      location: "Bengaluru",
      riskScore: 18
    },
    {
      identityId: "ID-047",
      timestamp: new Date("2026-10-07T10:00:00Z"),
      action: "TRANSACTION",
      location: "Bengaluru",
      riskScore: 21
    },
    {
      identityId: "ID-047",
      timestamp: new Date("2026-10-07T11:00:00Z"),
      action: "TRANSACTION",
      location: "Bengaluru",
      riskScore: 19
    },
    {
      identityId: "ID-047",
      timestamp: new Date("2026-10-07T12:00:00Z"),
      action: "TRANSACTION",
      location: "Bengaluru",
      riskScore: 22
    },
    {
      identityId: "ID-047",
      timestamp: new Date("2026-10-07T13:00:00Z"),
      action: "TRANSACTION",
      location: "Bengaluru",
      riskScore: 20
    },
    {
      identityId: "ID-047",
      timestamp: new Date("2026-10-07T14:00:00Z"),
      action: "TRANSACTION",
      location: "Bengaluru",
      riskScore: 18
    },
    {
      identityId: "ID-047",
      timestamp: new Date("2026-10-07T15:00:00Z"),
      action: "TRANSACTION",
      location: "Bengaluru",
      riskScore: 21
    },
    {
      identityId: "ID-047",
      timestamp: new Date("2026-10-07T16:00:00Z"),
      action: "TRANSACTION",
      location: "Bengaluru",
      riskScore: 19
    },
    {
      identityId: "ID-047",
      timestamp: new Date("2026-10-07T17:00:00Z"),
      action: "TRANSACTION",
      location: "Bengaluru",
      riskScore: 23
    },
    {
      identityId: "ID-047",
      timestamp: new Date("2026-10-08T14:30:00Z"),
      action: "TRANSACTION_SPIKE",
      location: "Bengaluru",
      riskScore: 87
    }
  ];

  for (const activity of activityData) {
    await prisma.activity.create({
      data: activity
    });
  }

  // --------------------------------------------------
  // 9. Security events
  // --------------------------------------------------

  const events = [
    {
      eventId: "EVT-001-001",
      identityId: "ID-001",
      timestamp: new Date("2026-10-07T08:00:00Z"),
      ip: "IP-001",
      deviceId: "D-001",
      location: "Bengaluru",
      userAgent: "Chrome",
      failedLogins: 0,
      loginVelocity: 1,
      riskScore: 12,
      decision: "ALLOW"
    },
    {
      eventId: "EVT-025-001",
      identityId: "ID-025",
      timestamp: new Date("2026-10-08T06:00:00Z"),
      ip: "IP-025",
      deviceId: "D-025",
      location: "Mumbai",
      userAgent: "Chrome",
      failedLogins: 1,
      loginVelocity: 3,
      riskScore: 51,
      decision: "CHALLENGE"
    },
    {
      eventId: "EVT-047-001",
      identityId: "ID-047",
      timestamp: new Date("2026-10-08T14:30:00Z"),
      ip: "IP-012",
      deviceId: "D-009",
      location: "Bengaluru",
      userAgent: "Chrome",
      failedLogins: 3,
      loginVelocity: 8,
      riskScore: 87,
      decision: "REVIEW"
    }
  ];

  for (const event of events) {
    await prisma.securityEvent.create({
      data: event
    });
  }

  // --------------------------------------------------
  // 10. Risk indicators
  // --------------------------------------------------

  const indicators = [
    {
      identityId: "ID-001",
      name: "Known Device",
      score: 0,
      severity: "LOW",
      evidence: "Device D-001 is associated with the identity."
    },
    {
      identityId: "ID-001",
      name: "Normal Behaviour",
      score: 0,
      severity: "LOW",
      evidence: "Observed activity remains close to the historical baseline."
    },

    {
      identityId: "ID-025",
      name: "New Device",
      score: 10,
      severity: "MEDIUM",
      evidence: "Device D-025 is recently associated with the identity."
    },
    {
      identityId: "ID-025",
      name: "Location Deviation",
      score: 8,
      severity: "MEDIUM",
      evidence: "Recent activity occurred from Mumbai instead of the usual Bengaluru location."
    },
    {
      identityId: "ID-025",
      name: "Behaviour Deviation",
      score: 12,
      severity: "MEDIUM",
      evidence: "Activity pattern differs moderately from the historical baseline."
    },

    {
      identityId: "ID-047",
      name: "Shared Device",
      score: 25,
      severity: "HIGH",
      evidence: "Device D-009 is shared with 4 other identities."
    },
    {
      identityId: "ID-047",
      name: "Shared IP",
      score: 20,
      severity: "HIGH",
      evidence: "IP-012 is linked to 5 identities."
    },
    {
      identityId: "ID-047",
      name: "New Account",
      score: 15,
      severity: "HIGH",
      evidence: "Identity account was created only 3 days before the suspicious event."
    },
    {
      identityId: "ID-047",
      name: "Behaviour Anomaly",
      score: 15,
      severity: "HIGH",
      evidence: "Activity increased sharply from a baseline near 10 to 184."
    },
    {
      identityId: "ID-047",
      name: "Suspicious Cluster",
      score: 12,
      severity: "HIGH",
      evidence: "Identity is connected to a cluster of 5 identities through shared infrastructure."
    }
  ];

  for (const indicator of indicators) {
    await prisma.riskIndicator.create({
      data: indicator
    });
  }

  // --------------------------------------------------
  // 11. Identity relationships
  // --------------------------------------------------

  const relationships = [
    {
      identityId: "ID-047",
      relatedId: "ID-081",
      relationshipType: "SHARED_DEVICE",
      weight: 5
    },
    {
      identityId: "ID-047",
      relatedId: "ID-023",
      relationshipType: "SHARED_DEVICE",
      weight: 5
    },
    {
      identityId: "ID-047",
      relatedId: "ID-032",
      relationshipType: "SHARED_DEVICE",
      weight: 5
    },
    {
      identityId: "ID-047",
      relatedId: "ID-019",
      relationshipType: "SHARED_DEVICE",
      weight: 5
    },
    {
      identityId: "ID-047",
      relatedId: "ID-081",
      relationshipType: "SHARED_IP",
      weight: 4
    },
    {
      identityId: "ID-047",
      relatedId: "ID-023",
      relationshipType: "SHARED_IP",
      weight: 4
    },
    {
      identityId: "ID-047",
      relatedId: "ID-032",
      relationshipType: "SHARED_IP",
      weight: 4
    },
    {
      identityId: "ID-047",
      relatedId: "ID-019",
      relationshipType: "SHARED_IP",
      weight: 4
    }
  ];

  for (const relationship of relationships) {
    await prisma.relationship.create({
      data: relationship
    });
  }

  // --------------------------------------------------
  // 12. Audit log
  // --------------------------------------------------

  await prisma.auditLog.create({
    data: {
      action: "SEED_DATA_CREATED",
      actor: "admin@idex.local",
      details:
        "Synthetic IDeX investigation dataset created for hackathon demonstration."
    }
  });

  console.log("IDeX seed completed successfully.");
  console.log("Demo identities: ID-001, ID-025, ID-047");
  console.log("Suspicious infrastructure: D-009 / IP-012");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });