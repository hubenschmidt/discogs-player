module.exports = function(sequelize, DataTypes) {
  const Session = sequelize.define("Session", {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    expires: DataTypes.DATE,
    data: DataTypes.STRING
  });

  return Session;
};
