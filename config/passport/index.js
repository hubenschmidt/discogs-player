const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const db = require("../../models");
// console.log(passport.use(LocalStrategy))

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  // console.log("*** serializeUser called, user: ");
  // console.log(user); // the whole raw user object!
  // console.log("---------");
  done(null, { id: user.id });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  // console.log("DeserializeUser called", id.id);
  
  db.User.findByPk(id.id).then(function(user) {
    if(user){
      done(null, user.get());
    }
    else{
      done(user.errors,null);
    }
  });


  // db.User.findByPk({ id }, "username", (err, user) => {
  //   console.log("*** Deserialize user, user:");
  //   console.log(user);
  //   console.log("--------------");
  //   done(null, user);
  // });
});

//  Use Strategies
// passport.use('local-signup', LocalStrategy);
passport.use(LocalStrategy);

module.exports = passport;