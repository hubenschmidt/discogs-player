const db = require("../../models");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "email"
  },

  function(email, password, done) {
    // console.log('THIS IS THE USER========',email, 'THIS IS THE USER========')
    db.User.findOne({ where: { email: email } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect email" }); 
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      })
      .catch(err => {
        return done(err);
      });
  }
);

module.exports = strategy;
