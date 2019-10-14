const express = require("express");
const router = express.Router();
const db = require("../../models");
const passport = require("../../config/passport");
const userController = require("../../controllers/UserController")

// matches with /api/user/register
router.post("/register", userController.findOrCreate)

// matches with /api/user/login
router.post("/login", passport.authenticate('local'), userController.userLogin)


// router.get("/", (req, res, next) => {
//   console.log("===== user!!======");
//   // console.log(req.user);
//   if (req.user) {
//     res.json({ user: req.user });
//   } else {
//     res.json({ user: null });
//   }
// });

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;