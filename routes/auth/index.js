const router = require("express").Router();
const authRoutes = require("./auth")

// matches with /auth
router.use("/", authRoutes);

module.exports = router;