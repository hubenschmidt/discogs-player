const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const DiscogsStrategy = require("./discogsStrategy");

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  // console.log("*** serializeUser called, user: ");
  console.log('user object', user); // the whole raw user object!

//PERSIST USER OBJECT TO DATABASE HERE BY CHECKING USER MODEL FOR ORIGINAL LOGIN
  if (user.provider === 'discogs') {
    // save to database as passport user object:
    //
    //
    console.log(user.provider)
    done(null, user);
    // done(null, user);
  } else {
    // console.log("---------");
    // done(null, { id: user.id });
    // serialize the entire object and put it inside the cookie used to track sessions
    console.log(user.email)
    done(null, user);
  }
});

// user object attaches to the request as req.user
// passport.deserializeUser((id, done) => {
//   console.log("DeserializeUser called", id);
//   db.User.findAll({
//     where: { id: id.id },
//   }).then(function(user){
//     console.log('user id callback', user)
//   // db.User.findByPk(id.id).then(function(user) {
//   // .then(function(user) {
//     if (user) {
//       done(null, user.get());
//     } else {
//       done(user.errors, null);
//     }
//   });
// });
passport.deserializeUser((obj, cb) => cb(null, obj))

//the callback that is invoked when an OAuth provider sends back user information. Normally, you would save the user to the database in this callback and it would be customized for each provider.

// const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile);

//  Use Strategies
// passport.use('local-signup', LocalStrategy);

// passport.use(new DiscogsStrategy(DISCOGS_CONFIG));
passport.use(DiscogsStrategy);
passport.use(LocalStrategy);

module.exports = passport;
