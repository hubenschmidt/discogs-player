const router = require("express").Router();
const userRoutes = require("./user");
// const isAuthenticated = require("../config/middleware/isAuthenticated");

//set up routes
router.use("/user", userRoutes);
// router.use('/records', recordRoutes);

module.exports = router;