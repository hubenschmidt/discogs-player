const express = require("express");
const router = express.Router();
const db = require("../../models");
const passport = require("../../config/passport");
const userController = require("../../controllers/UserController");

// matches with /api/user/test
router.get("/test", userController.testWithoutService);

// matches with /api/user
router.post("/", userController.findOrCreate)

// // matches with api/user
// router.get("/", userController.getUser);

// matches with /api/user/login
router.post("/login", passport.authenticate("local"), userController.userLogin);

// matches with /api/user/logout
router.post("/logout", userController.userLogout);

module.exports = router;
