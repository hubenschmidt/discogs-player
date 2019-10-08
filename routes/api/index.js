const path = require("path");
const router = require("express").Router();
const userRoutes = require("./user");
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.use("/user", userRoutes);

module.exports = router;