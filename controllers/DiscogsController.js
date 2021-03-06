//test controller methods in postman
//after tests succeed, break into service/controller/model architecture
const db = require('../models');
const Discogs = require('disconnect').Client;
const { DISCOGS_CONFIG } = require('../config/oauth/index');

module.exports = {
  test: test,
  sync: sync,
};

//TEST AND REFACTOR==============
async function test(req, res) {
  res.send('welcome to discogs api route');
}

// function copy(obj) {
//   var cp = {};
//   for (var o in obj) {
//     cp[o] = obj[o];
//   }
//   return cp;
// }

async function paginateCollection(userData, pageNum, collection = []) {
  // var userData = await getUserData(userId);
  let accessData = {
    method: 'oauth',
    level: 2,
    consumerKey: DISCOGS_CONFIG.consumerKey,
    consumerSecret: DISCOGS_CONFIG.consumerSecret,
    token: userData.token,
    tokenSecret: userData.tokenSecret,
  };
  //instantiate disconnect class to test identity
  var col = new Discogs(accessData).user().collection();

  return new Promise((resolve, reject) => {
    col
      .getReleases(userData.discogsUsername, 0, {
        page: pageNum,
        per_page: 500,
      })
      .then((data) => {
        collection = collection.concat(data.releases);

        if (data.pagination.urls.next) {
          try {
            resolve(paginateCollection(userData, pageNum + 1, collection));
          } catch (e) {
            reject(e);
          }
        } else {
          resolve(collection);
        }
      })
      .catch((err) => reject(err));
  });
}

async function getUserData(id) {
  return new Promise((resolve, reject) => {
    try {
      //find by app user id
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
  let paginatedCollection = await paginateCollection(userData, 1);
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

  // console.log(releases[0].basic_information, "logging collArr from sync function");

  let releaseModel = releases.map((release) => {
    // console.log(release.basic_information, 'logging release map');
    return release.basic_information;
  });

  // deduplicate release array before persisting to db:
  let seen = new Set();

  let filteredArr = releaseModel.filter((el) => {
    const duplicate = seen.has(el.id);
    seen.add(el.id);
    return !duplicate;
  });

  let instanceModel = releases.map((release) => {
    // set model properties to correspond to instance model in postgres db
    return {
      instance_id: release.instance_id,
      rating: release.rating,
      folder_id: release.folder_id,
      date_added: release.date_added,
      id: release.id,
      UserId: userId,
      ReleaseId: release.id,
    };
  });

  //bulk upsert to database
  // db.Release.bulkCreate(releaseModel, {
  db.Release.bulkCreate(filteredArr, {
    //  * Fields to update if row key already exists (on duplicate key update)? (only supported by mysql &
    //   * mariadb). By default, all fields are updated.
    //   */
    // updateOnDuplicate: ["id"]

    //if duplicate, update all the fields. for some reason, not doing so causes a validation error:
    updateOnDuplicate: [
      'labels',
      'year',
      'master_url',
      'artists',
      'id',
      'thumb',
      'title',
      'formats',
      'genres',
      'styles',
      'cover_image',
      'resource_url',
      'master_id',
    ],
  })
    // .then(dbModel => console.log(dbModel)).catch(err=>console.log(err))
    .then((dbModel) => {
      // console.log(dbModel);
      res.json(dbModel);
      db.Instance.bulkCreate(instanceModel, {
        updateOnDuplicate: [
          'instance_id',
          'rating',
          'folder_id',
          'date_added',
          'id',
        ],
      });
    })
    // returns instanceModel
    // .then(dbModel => {
    //   console.log(dbModel);
    //   res.json(dbModel);
    // })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });

  //return res.json

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
