// models/user.js

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        required: true
      },
      email: {
        type: DataTypes.STRING,
        required: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      instanceMethods: {
        validPassword: function(password) {
          return bcrypt.compareSync(password, this.password);
        }
      }
    }
  );

  return User;
};
