const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        status: "ERROR",
        message: "User role not available"
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "ERROR",
        message: "Insufficient permissions"
      });
    }

    next();
  };
};

module.exports = {
  authorizeRoles
};