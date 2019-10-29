const DiscogsStrategy = require("passport-discogs").Strategy;
// const { Strategy: DiscogsStrategy } = require("passport-discogs");
const db = require("../../models");

const { DISCOGS_CONFIG } = require("../oauth/index.js");

console.log(DISCOGS_CONFIG);

// const discogs = new DiscogsStrategy({ DISCOGS_CONFIG
// }, function (req, token, refreshToken, profile, done) {
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

    //   logger.debug({ user: user }, "user exists, updating discogs details");

    //   user.discogs.id = profile.id;
    //   user.discogs.token = token;

    //   user.save(function(err) {
    //     if (err) {
    //       throw err;
    //     }
    //     return done(null, user);
    //   });

    return done(null, profile)
  };

  process.nextTick(updateUser);
});

module.exports = discogs;
