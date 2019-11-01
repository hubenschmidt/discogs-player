//test controller methods in postman
//after tests succeed, break into service/controller/model architecture
const db = require("../models");
const Discogs = require("disconnect").Client;
const { DISCOGS_CONFIG } = require("../config/oauth/index");

module.exports = {
  test: test,
  //   getUserData: getUserData,
  //   getUserCollection: getUserCollection,
  sync: sync,
  paginateCollection: paginateCollection
};

//TEST AND REFACTOR==============
async function test(req, res) {
  res.send("welcome to discogs api route");
}



async function paginateCollection(userData) {
    // var userData = await getUserData(userId);
    let accessData = {
      method: "oauth",
      level: 2,
      consumerKey: DISCOGS_CONFIG.consumerKey,
      consumerSecret: DISCOGS_CONFIG.consumerSecret,
      token: userData.token,
      tokenSecret: userData.tokenSecret
    };
    //instantiate disconnect class to test identity
    var col = new Discogs(accessData).user().collection();
  
    return new Promise((resolve, reject) => {
      try {
        col.getReleases(
          userData.discogsUsername,
          0,
          //default returns 50 results per page, max is 500, make repeated API calls based on pagination.urls.last and .next until complete.
          // Get page 1 of discogsUsername's public collection showing 500 releases. The second param is the collection folder ID where 0 is always the "All" folder
          { page: 1, per_page: 500 },
          function(err, data) {
            resolve(data);
            //   resolve(data);
            //RECURSIVELY CALL FUNCTION BASED ON next page=
            // //base
            // if (!data.pagination.urls.next) {
            //     return false;
            // }
            // //recursion
            // if (data.pagination.urls.last){
            //     return paginateCollection(userid, (pageNum + 1))
            // }
            // // if (err) reject(err);
            // // resolve(data ? data.releases: null)
          }
        );
      } catch (e) {
        reject(e);
      }
  
      // // TERMINATION
      // if (x < 0) return;
      // // BASE
      // if (x === 0) return 1;
      // // RECURSION
      // return x * factorial(x - 1);
      //   }
    });
  }


async function getUserData(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(db.User.findByPk(id));
    } catch (e) {
      reject(e);
    }
  });
}


async function getUserCollection(userId) {
  var userData = await getUserData(userId);

//   let accessData = {
//     method: "oauth",
//     level: 2,
//     consumerKey: DISCOGS_CONFIG.consumerKey,
//     consumerSecret: DISCOGS_CONFIG.consumerSecret,
//     token: userData.token,
//     tokenSecret: userData.tokenSecret
//   };

//   //instantiate disconnect class to test identity
//   var col = new Discogs(accessData).user().collection();
  var coll = await paginateCollection(userData);
  console.log(coll)

  //   return new Promise((resolve, reject) => {
  //     try {
  //       console.logpaginateCollection(userData.discogsUsername)

  //     //   col.getReleases(
  //     //     userData.discogsUsername,
  //     //     0,
  //     //     //default returns 50 results per page, max is 500, make repeated API calls based on pagination.urls.last and .next until complete.
  //     //     // Get page 1 of discogsUsername's public collection showing 500 releases. The second param is the collection folder ID where 0 is always the "All" folder
  //     //     { page: 1, per_page: 500 },
  //     //     function(err, data) {
  //     //       resolve(data);

  //     //       // if (err) reject(err);
  //     //       // resolve(data ? data.releases: null)
  //     //     }
  //     //   );
  //     } catch (e) {
  //       reject(e);
  //     }
  //   });
}

async function sync(req, res) {
  var userId = req.params._id;
  var releases = await getUserCollection(userId);
  console.log(releases, "logging releases");
  //   await asyncForEach(releases, async release => {
  //     var releaseId = release.id;
  //     var existing = await dbFindOneByReleaseId(releaseId);
  //     if (existing) {
  //       existing = existing.toJSON();
  //       var update = false;
  //       if (existing.userIds) {
  //         existing.userIds = existing.userIds.map(uid => uid.toString());
  //         if (existing.userIds.indexOf(userId) == -1) {
  //           existing.userIds.push(userId);
  //           update = true;
  //         }
  //       } else {
  //         existing.userIds = [userId];
  //         update = true;
  //       }
  //       if (update)
  //         await findOneAndUpdatePromise(
  //           { _id: existing._id },
  //           { userIds: existing.userIds }
  //         );
  //     } else {
  //       const dbRel = formatResponse(release);
  //       dbRel[0].userIds = [userId];
  //       await createReleasePromise(dbRel);
  //     }
  //   });
  //   res.json(releases);
}
