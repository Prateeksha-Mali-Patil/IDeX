const prisma = require("../lib/prisma");

const getIdentities = async (req, res) => {
  try {
    const identities = await prisma.identity.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        devices: true,
        ips: true
      }
    });

    res.json({
      status: "OK",
      count: identities.length,
      identities
    });
  } catch (error) {
    console.error("Failed to fetch identities:", error);

    res.status(500).json({
      status: "ERROR",
      message: "Failed to fetch identities"
    });
  }
};

const getIdentityById = async (req, res) => {
  try {
    const { identityId } = req.params;

    const identity = await prisma.identity.findUnique({
      where: {
        id: identityId
      },
      include: {
        devices: true,
        ips: true,
        activities: true,
        events: true,
        indicators: true,
        relationships: true
      }
    });

    if (!identity) {
      return res.status(404).json({
        status: "ERROR",
        message: "Identity not found"
      });
    }

    res.json({
      status: "OK",
      identity
    });
  } catch (error) {
    console.error("Failed to fetch identity:", error);

    res.status(500).json({
      status: "ERROR",
      message: "Failed to fetch identity"
    });
  }
};

module.exports = {
  getIdentities,
  getIdentityById
};