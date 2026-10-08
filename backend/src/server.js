const express = require("express");
const cors = require("cors");
require("dotenv").config();

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");
const identityRoutes = require("./routes/identityRoutes");

const { idexSecurityMiddleware } = require("./middleware/idexSecurityMiddleware");

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// IDeX Security Middleware
// Host applications can send an `idexEvent` in the request body.
// IDeX analyzes the event before the request reaches the route.
app.use(idexSecurityMiddleware);

// Routes
app.use("/", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/identities", identityRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`IDeX Backend running on http://localhost:${PORT}`);
});