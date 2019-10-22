const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // firstName: {
    //   type: DataTypes.STRING,
    //   required: true
    // },
    // lastName: {
    //   type: DataTypes.STRING,
    //   required: true
    // },
    email: {
      type: DataTypes.STRING,
      required: true,
      // validate: {
      //   isEmail: true
      // }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    // console.log('password created' + password)
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.beforeCreate(function(user, options) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });


  return User;
};