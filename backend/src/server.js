const express = require("express");
const cors = require("cors");
require("dotenv").config();

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");
const identityRoutes = require("./routes/identityRoutes");
const eventRoutes = require("./routes/eventRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const auditRoutes = require("./routes/auditRoutes");

const { idexSecurityMiddleware } = require("./middleware/idexSecurityMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use(idexSecurityMiddleware);

app.use("/", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/identities", identityRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/audit", auditRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`IDeX Backend running on http://localhost:${PORT}`);
});