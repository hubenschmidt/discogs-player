const express = require("express");
const router = express.Router();
const authController = require("../../controllers/AuthController")
const { DISCOGS_CONFIG } = require("../../config/oauth/index");

const Discogs = require("disconnect").Client;


// routes that are triggered on the client.
// matches with /auth/discogs
router.get("/discogs", authController.requestToken);

// matches with /auth/discogs
router.get("/discogs/callback", authController.accessToken);





// // routes that are triggered on the client.
// // matches with /auth/discogs
// router.get("/discogs", function(req, res) {
//   var oAuth = new Discogs().oauth();
//   oAuth.getRequestToken(
//     DISCOGS_CONFIG.consumerKey,
//     DISCOGS_CONFIG.consumerSecret,
//     DISCOGS_CONFIG.callbackURL,
//     function(err, requestData) {
//       // Persist "requestData" here so that the callback handler can
//       // access it later after returning from the authorize url
//       console.log("request data here", requestData);
//       res.redirect(requestData.authorizeUrl);

//       //matches with /auth/discogs/callback
//       // router.get("/discogs/callback", authController.discogs);
//       router.get("/discogs/callback", function(req, res) {
//         var oAuth = new Discogs(requestData).oauth();
//         oAuth.getAccessToken(
//           req.query.oauth_verifier, // Verification code sent back by Discogs
//           function(err, accessData) {
//             // Persist "accessData" here for following OAuth calls
//             console.log("accessData here", accessData);
//             // res.send("Received access token!");
//             res.send("<script>window.close()</script>");
//           }
//         );
//       });
//     }
//   );
// });

// matches with auth/discogs/identity
// testing discogs authentication using token and secret
router.get("/discogs/identity", function(req, res) {
  var accessData = {
    method: "oauth",
    level: 2,
    consumerKey: "ucyQbMxfuVNEigpgyQrp",
    consumerSecret: "hJkdzVOPODpOErIWzhkKgUeBJDQlqAEt",
    token: "sHomdpCOzYUfxnLVlcFMgjEhHQQycrhKXUyrkJXW",
    tokenSecret: "fxGeqIjkMdpecPtxpiMghddaHyjGPNvQjADvnJaI"
  };
  var dis = new Discogs(accessData);

  dis.getIdentity(function(err, data) {
    res.send(data);
  });
});

module.exports = router;
