const passport = require("passport");
const LocalStrategy = require("./localStrategy");

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  // console.log("*** serializeUser called, user: ");
  // console.log("user object", user); // the whole raw user object!
  // console.log("---------");
  // done(null, { id: user.id });
  // serialize the entire object and put it inside the cookie used to track sessions
  done(null, user);
});

passport.deserializeUser((obj, cb) => cb(null, obj));

//the callback that is invoked when an OAuth provider sends back user information. Normally, you would save the user to the database in this callback and it would be customized for each provider.

passport.use(LocalStrategy);

module.exports = passport;
