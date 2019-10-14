const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
// const dashboardRoutes = require("./dashboard");

// const isAuthenticated = require('../config/middleware/isAuthenticated')

router.use("/api", apiRoutes);
// router.use("/dashboard", isAuthenticated, dashboardRoutes);


module.exports = router;
