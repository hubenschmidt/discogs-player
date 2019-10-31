//test controller methods in postman
//after tests succeed, break into service/controller/model architecture
const db = require("../models");

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

async function getUserData (id) {
    return new Promise((resolve, reject) => {
      db.User.findByPk(id, function(err, doc) {
        if (err) reject(err);
        resolve(doc ? doc.toJSON() : undefined);
      });
    });
  };

async function getUserCollection(userId) {
//   var userData = await getUserData(userId);
 
  // var accessData = userData
  //construct accessData from userData promise response====================-

//   var col = new Discogs(accessData).user().collection();
  return new Promise((resolve, reject) => {
      
    try {
        resolve('testing promise')
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
  res.json(userId)
  var releases = await getUserCollection(userId);
  console.log(releases, 'logging releases')
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
