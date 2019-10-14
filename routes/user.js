const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../config/passport");
const userController = require("../controllers/UserController")

router.post("/register", userController.findOrCreate)
router.post("/login", passport.authenticate('local'), userController.userLogin)

// router.post(
//   "/login",
//   passport.authenticate("local"),
//   (req, res) => {
//     console.log("logged in", req.user);
//     var userInfo = {
//       email: req.user.email
//     };
//     res.send(userInfo);
//     // console.log(userInfo, 'userinfo')
//   }
// );

router.get("/", (req, res, next) => {
  console.log("===== user!!======");
  // console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;