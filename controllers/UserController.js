// controllers/UserController.js

const UserService = require("../services/UserService");
//add utils

class UserController {
  static async findOrCreate(req, res) {
    console.log("user signup");
    const { username, password } = req.body;

    try {
      const createdOrFoundUser = await UserService.findOrCreate({
        where: { username: username },
        defaults: { password: password }
      });
      if (!createdOrFoundUser) {
        console.log("Sorry, username already taken!")
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
