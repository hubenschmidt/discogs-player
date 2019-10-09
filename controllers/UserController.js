// controllers/UserController.js

const UserService = require("../services/UserService");
const Util = require("../utils/Utils");

const util = new Util();

class UserController {
  static async testWithoutService(req, res) {
    try {
      if (req) {
        util.setSuccess(200, "POST /api/user test", {data: "test data"});
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async findOrCreate(req, res) {
    console.log("user signup");
    const { username, password } = req.body;

    try {
      const createdOrFoundUser = await UserService.findOrCreate({
        where: { username: username },
        defaults: { password: password }
      });
      if (!createdOrFoundUser) {
        console.log("Sorry, username already taken!");
        res.json({
          error: "Sorry, username already taken!"
        });
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = UserController;
