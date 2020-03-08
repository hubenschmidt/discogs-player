const router = require("express").Router();
const discogsRoutes = require("./discogs");
const userRoutes = require("./user");

// matches with api/discogs
router.use("/user", userRoutes);
router.use("/discogs", discogsRoutes);

module.exports = router;
