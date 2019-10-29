const express = require("express");
const router = express.Router();
const passport = require("../../config/passport");
const authController = require("../../controllers/AuthController");
const Discogs = require('disconnect').Client;

// setting up the passport middleware for each of the OAuth providers
// const discogsAuth = passport.authenticate("discogs");
// const discogsAuth = require("../../config/middleware/discogs")

// routes that are triggered by the callbacks from each OAuth provider once the user has authenticated successfully.

// routes that are triggered on the client.
// matches with /auth/discogs
router.get('/discogs', function(req, res){
	var oAuth = new Discogs().oauth();
	oAuth.getRequestToken(
		'ucyQbMxfuVNEigpgyQrp', 
		'hJkdzVOPODpOErIWzhkKgUeBJDQlqAEt', 
		'https://localhost:5000/auth/discogs/callback', 
		function(err, requestData){
      // Persist "requestData" here so that the callback handler can 
      console.log(requestData)
			// access it later after returning from the authorize url
			res.redirect(requestData.authorizeUrl);
		}
	);
});

//matches with /auth/discogs/callback
router.get("/discogs/callback", authController.discogs);

//this custom middleware allows us to attack the socket id to the session.
// With that socket id we can send back the right user info to the right socket.
router.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});



module.exports = router;
