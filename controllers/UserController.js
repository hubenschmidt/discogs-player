// controllers/UserController.js

const UserService = require("../services/UserService");
const Util = require("../utils/Utils");

const util = new Util();

class UserController {
  static async testWithoutService(req, res) {
    try {
      if (req) {
        util.setSuccess(200, "POST /api/user test", "test data");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async findOrCreate(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || ! password ) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    try {
      const createdOrFoundUser = await UserService.findOrCreate({
        where: { email: email },
        defaults: {
          name: name,
          password: password
        }
      });

      util.setSuccess(201, "User Added!", createdOrFoundUser);
      return util.send(res);
    } catch (error) {
      console.log(error);
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = UserController;
