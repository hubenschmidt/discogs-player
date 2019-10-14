const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");
// const dashboardRoutes = require("./dashboard");
const userRoutes = require("./user")
const isAuthenticated = require('../config/middleware/isAuthenticated')

// router.use("/api", apiRoutes);
// router.use("/dashboard", isAuthenticated, dashboardRoutes);
router.use("/user", userRoutes);

module.exports = router;