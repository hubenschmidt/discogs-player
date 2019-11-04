//test controller methods in postman
//after tests succeed, break into service/controller/model architecture
const db = require("../models");
const Discogs = require("disconnect").Client;
const { DISCOGS_CONFIG } = require("../config/oauth/index");

module.exports = {
  test: test,
  sync: sync
};

//TEST AND REFACTOR==============
async function test(req, res) {
  res.send("welcome to discogs api route");
}

function copy(obj) {
    var cp = {};
    for (var o in obj) {
        cp[o] = obj[o];
    }
    return cp;
  }

async function paginateCollection(userData, pageNum) {
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

    let collArr = [];
    
    try {

    //   let collArr = [];
      col.getReleases(
        userData.discogsUsername,
        0,
        { page: pageNum, per_page: 10 },
        function(err, data) {
        //   // call function if url.next, increment page number
          if (data.pagination.urls.next) {

            let pageData = copy(data.releases)
            collArr.push(pageData)
            console.log(collArr)
            console.log(pageNum, "next");
            paginateCollection(userData, pageNum + 1);

          } else if (!data.pagination.urls.next) {
            let pageData = copy(data.releases)
            collArr.concat(pageData)
            console.log(collArr)
            console.log(pageNum, "last");

          } else {
            resolve(collArr);  
          }

        resolve(collArr);
        }
      );

    } catch (e) {
      reject(e);
    }

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

  // var coll = await paginateCollection(userData, 6);
  // console.log(coll);
  let paginatedCollection = await paginateCollection(userData, 135);
  //   console.log(paginatedCollection)

  return new Promise((resolve, reject) => {
    try {
      resolve(paginatedCollection);
    } catch (e) {
      reject(e);
    }
  });
}

async function sync(req, res) {
  var userId = req.params._id;
  var releases = await getUserCollection(userId);

  console.log(releases, "logging collArr from sync function");

  //   console.log(releases)
  //   console.log(releases, "logging releases");
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
