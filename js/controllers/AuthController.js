// const Discogs = require("disconnect").Client;
// const { DISCOGS_CONFIG } = require("../config/oauth/index");

// module.exports = {
//   requestToken: function(req, res) {
//     return new Promise((resolve, reject) => {
//       try {
//         var oAuth = new Discogs().oauth();
//         oAuth.getRequestToken(
//           DISCOGS_CONFIG.consumerKey,
//           DISCOGS_CONFIG.consumerSecret,
//           DISCOGS_CONFIG.callbackURL,
//           function(err, requestData) {
//             var someData = requestData;
//             // Persist "requestData" here so that the callback handler can
//             // access it later after returning from the authorize url
//             console.log("request data here", requestData);
//             res.redirect(requestData.authorizeUrl);
//             resolve(requestData);
//           }
//         );
//       } catch (err) {
//         reject(err);
//       }
//     });
//   },

//   accessToken: async function(req, res) {
//     var oAuth = new Discogs(requestData).oauth();
//     oAuth.getAccessToken(
//       req.query.oauth_verifier, // Verification code sent back by Discogs
//       function(err, accessData) {
//         // Persist "accessData" here for following OAuth calls
//         console.log("accessData here", accessData);
//         // res.send("Received access token!");
//         res.send("<script>window.close()</script>");
//       }
//     );
//   }
// };
