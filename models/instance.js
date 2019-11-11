module.exports = function(sequelize, DataTypes) {
  const Instance = sequelize.define("Instance", {
    //move to instance.js and make one -to -many
    //assoication between collection item and instance
    instance_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    rating: {
      type: DataTypes.INTEGER
    },
    folder_id: {
      type: DataTypes.INTEGER
    },
    date_added: DataTypes.STRING,
    id: DataTypes.INTEGER
    // ReleaseId: DataTypes.INTEGER
  });
  // Instance.associate = function(models) {
  //   Instance.belongsTo(models.Release, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //     // foreignKey: "id", as: "releases",
  //   });
  // };

  return Instance;
};
