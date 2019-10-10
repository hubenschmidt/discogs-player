// // services/userService.js

const db = require("../models");


class UserService {
  static async findOrCreate(user){
    try{
      return await db.User.findOrCreate(user)
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
