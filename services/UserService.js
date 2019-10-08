// // services/userService.js

const db = require("../models");

class UserService {
  static async findOrCreate(
    user
    //       {
    //     where: { username: username },
    //     defaults: { password: password }
    //   }
  ) {
    try {
      return await db.User.findOne(user);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
