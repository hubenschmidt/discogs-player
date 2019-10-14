const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../config/passport");

router.post("/register", (req, res) => {
  console.log("user signup");
  const { email, password } = req.body;

  // ADD VALIDATION
  db.User.findOrCreate({
    where: { email: email },
    defaults: { password: password }
  }).then(([user, created]) => {
    if (!created) {
      console.log("user created:", created);
      res.json({
        error: `Sorry, already a user with the email: ${email}`
      });
    } else if (created) {
      console.log(
        user.get({
          plain: true
        })
      );
      res.json({ user });
    }
  });
});



router.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      email: req.user.email
    };
    res.send(userInfo);
    // console.log(userInfo, 'userinfo')
  }
);

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