const router = require("express").Router();
const discogs = require("./discogs")

// matches with /auth
router.use("/", discogs);

module.exports = router;