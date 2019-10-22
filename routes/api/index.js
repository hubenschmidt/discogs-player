const router = require("express").Router();
const userRoutes = require("./user")

// matches with api/user
router.use("/user", userRoutes);

module.exports = router;