// controllers/UserController.js

const UserService = require("../services/xxxxxxxxUserService");
const Util = require("../utils/xxxxxxxxxUtils");

const util = new Util();

// load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

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
    // const { name, email, password } = req.body;
    const { email, password } = req.body;
    const { errors, isValid } = validateRegisterInput(req.body);

    //check validation
    if (!isValid) {
      util.setError(400, errors);
      return util.send(res);
    }

    //if required field is blank
    // if (!name || !email || !password) {
    if (!email || !password) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }

    //create or find user
    try {
      const createdOrFoundUser = await UserService.findOrCreate({
        where: { email: email },
        defaults: {
          // name: name,
          password: password
        }
      });
      if (createdOrFoundUser[1] === true) {
        util.setSuccess(201, "User Added!", createdOrFoundUser);
        return util.send(res);
      } else {
        util.setSuccess(201, "User Already Exists!", createdOrFoundUser);
        return util.send(res);
      }
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static userLogin(req, res) {
    try {
      const userInfo = {
        email: req.user.email
      };
      util.setSuccess(201, "User logged in!", userInfo);
      return util.send(res);
    } 
    catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = UserController;
