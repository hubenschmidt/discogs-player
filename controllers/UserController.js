// controllers/UserController.js

const UserService = require("../services/UserService");
const Util = require("../utils/Utils");

const util = new Util();

// load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

class UserController {
  static async testWithoutService(req, res) {
    try {
      if (req) {
        util.setSuccess(200, "/api/user test", "test data");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async findOrCreate(req, res) {
    console.log(req.body, 'findorCreate')
    const { email, password, password2 } = req.body;
    const { errors, isValid } = validateRegisterInput(req.body);

    //check validation
    if (!isValid) {
      util.setError(400, errors);
      // return util.send(res);
      console.log(errors)
    }

    //if required field is blank
    if (!email || !password || !password2 )  {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }

    //create or find user
    try {
      const createdOrFoundUser = await UserService.findOrCreate({
        where: { email: email },
        defaults: {
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

  static getUser(req, res) {
    console.log("===== current user!!======");
    console.log(req.user)
    if (req.user) {
      res.json({ user: req.user });
    } else {
      res.json({ user: null });
    }
  }

  static userLogin(req, res) {

    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const userInfo = {
        email: req.user.email
      };
      util.setSuccess(201, "User logged in!", userInfo);
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static userLogout(req, res) {
    if (req.user) {
      req.logout();
      res.send({ msg: "logging out" });
    } else {
      res.send({ msg: "no user to log out" });
    }
  }
}

module.exports = UserController;
