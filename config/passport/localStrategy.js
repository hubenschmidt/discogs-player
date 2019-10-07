// config/passport/localStrategy.js

const db = require("../../models");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "username"
  },

  function(username, password, done) {
    db.User.findOne({ where: { username: username } })
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        throw err;
      });
  }
);

module.exports = strategy;
