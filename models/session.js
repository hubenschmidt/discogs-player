module.exports = function(sequelize, DataTypes) {
    const Session = sequelize.define("Session", {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      // userId: DataTypes.STRING,
      expires: DataTypes.DATE,
      data: DataTypes.STRING(1000)
    });
  
  
    return Session;
  };