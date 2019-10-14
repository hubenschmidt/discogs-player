const db = require("../../models");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "email" // not necessary, DEFAULT
  },

  function(email, password, done) {
    // console.log(email, 'finding email')
    // console.log(db.User)
    db.User.findOne({ where: {email: email}})
    .then(user => {return done(null, user)})
    .catch(err => console.log(err))
      
      // console.log('THIS IS THE USER========',user, 'THIS IS THE USER========'))
    // db.User.findOne({ where: {username: username} }, (err, user) => {
    //   console.log(err)
    //   if (err) {
    //     return done(err);
    //   }
    //   if (!user) {
    //     return done(null, false, { message: "Incorrect username" });
    //   }
    //   if (!user.checkPassword(password)) {
    //     return done(null, false, { message: "Incorrect password" });
    //   }
    //   return done(null, user);
    // });
  }
);

module.exports = strategy;