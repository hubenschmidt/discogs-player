// controllers/UserController.js

const UserService = require("../services/UserService")
//add utils

class UserController {
    static async findOrCreate(req, res){
        console.log('user signup');
        const { username, password } = req.body;

        //ADD VALIDATION
        try {
            const createdOrFoundUser = await UserService.findOrCreate( { where: { username: username}, defaults: { password: password }})
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = UserController;