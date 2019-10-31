const express = require("express");
const router = express.Router();
const discogsController = require("../../controllers/DiscogsController");

// matches with /api/user/test
router.get("/test", discogsController.test);

module.exports = router;