// config/passport/index.js

const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const db = require("../../models");

//called on login, saves the id to session req.session.passport.user = {id: ".."}
passport.serializeUser((user, done) => {
    console.log("*** serializeUser called, user: ");
    console.log(user); //the whole raw user object
    console.log("-------");
    done(null, {id: user.id });
});

//user object attaches to the reques as req.user
passport.deserializeUser((id, done) =>{
    //console.log("DeserializeUser called", id.id);

    db.User.findByPk(id.id).then(function(user){
        if(user){
            done(null, user.get());
        }
        else{
            done(user.errors, null);
        }
    });
});

//Use Strategies
passport.use(LocalStrategy);

module.exports = passport;
