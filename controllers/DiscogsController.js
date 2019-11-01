//test controller methods in postman
//after tests succeed, break into service/controller/model architecture
const db = require("../models");
const Discogs = require("disconnect").Client;
const { DISCOGS_CONFIG } = require("../config/oauth/index");

module.exports = {
  test: test,
  //   getUserData: getUserData,
  //   getUserCollection: getUserCollection,
  sync: sync
};

//TEST AND REFACTOR==============

async function test(req, res) {
  res.send("welcome to discogs api route");
}

async function getUserData(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(db.User.findByPk(id));
      //   db.User.findByPk(id, function(err, dbModel) {
      //     // if (err) reject(err);
      //     resolve(dbModel)
      //     // resolve(dbModel ? dbModel.toJSON() : undefined);
      //   });
    } catch (e) {
      reject(e);
    }
  });
}

async function getUserCollection(userId) {
  var userData = await getUserData(userId);

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
      col.getReleases(userData.discogsUsername, 0, 


        //default returns 50 results per page, max is 500
        { page: 1, per_page: 500}, 
        function(err, data) {
          resolve(console.log(data, "RELEASES"))
        // if (err) reject(err);
        // resolve(data ? data.releases: null)
      });
    } catch (e) {
      reject(e);
    }
  });

  //   console.log(userData, 'USER DATA HERE')
  //   const dis = new Discogs(accessData).database();
  // var accessData = userData
  //construct accessData from userData promise response====================-

  //   var col = new Discogs(accessData).user().collection();
  return new Promise((resolve, reject) => {
    try {
      resolve(userData);
      //   col.getReleases(
      //     userData.discogsUserData.username,
      //     0,
      //     //configure to return entire paginated collection
      //     { page: 1, per_page: 256 },
      //     function(err, data) {
      //       if (err) reject(err);
      //       resolve(data ? data.releases : null);
      //     }
      //   );
    } catch (e) {
      reject(e);
    }
  });
}

async function sync(req, res) {
  var userId = req.params._id;
  var releases = await getUserCollection(userId);
  //   console.log('logging releases', releases)
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
