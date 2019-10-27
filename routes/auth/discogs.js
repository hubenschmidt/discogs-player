const express = require("express");
const router = express.Router();
const passport = require("../../config/passport");
const authController = require("../../controllers/AuthController");

// setting up the passport middleware for each of the OAuth providers
const discogsAuth = passport.authenticate("discogs");

// routes that are triggered by the callbacks from each OAuth provider once the user has authenticated successfully.

//matches with /auth/discogs/callback
router.get("/discogs/callback", discogsAuth, authController.discogs);

//this custom middleware allows us to attack the socket id to the session.
// With that socket id we can send back the right user info to the right socket.
router.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});

// routes that are triggered on the client.
// matches with /auth/discogs
router.get('/discogs', discogsAuth);

module.exports = router;
