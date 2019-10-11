// config/passport/localStrategy.js

const db = require("../../models");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "email"
  },

  function(email, password, done) {
    db.User.findOne({ where: { email: email } })
      .then(dbUser => {
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        } else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        return done(null, dbUser);
      })
      .catch(err => {
        throw err;
      });
  }
);

module.exports = strategy;
