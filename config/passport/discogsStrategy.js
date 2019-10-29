const DiscogsStrategy = require("passport-discogs").Strategy;
const db = require("../../models");
const { DISCOGS_CONFIG } = require("../oauth/index.js");

const discogs = new DiscogsStrategy(DISCOGS_CONFIG, function(
  oauth_token,
  oauth_token_secret,
  profile,
  done
) {
  const updateUser = function() {
    console.log("token", oauth_token);
    console.log("tokenSecret", oauth_token_secret);
    console.log("profile", profile);
    //   user.discogs.id = profile.id;
    //   user.discogs.token = token;

    //   user.save(function(err) {
    //     if (err) {
    //       throw err;
    //     }
    //     return done(null, user);
    //   });

    return done(null, profile);
  };

  process.nextTick(updateUser);
});

module.exports = discogs;
