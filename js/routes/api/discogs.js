const express = require("express");
const router = express.Router();
const discogsController = require("../../controllers/DiscogsController");

// matches with /api/discogs/test
router.get("/test", discogsController.test);

// matches with /api/discogs/col/:_id
router.get("/col/:_id", discogsController.sync)

module.exports = router;