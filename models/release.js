module.exports = function(sequelize, DataTypes) {
  const Release = sequelize.define(
    "Release",
    {
      //move to instance.js and make one -to -many
      //assoication between collection item and instance
      // instance_id: {
      //   type: DataTypes.INTEGER
      // },
      // rating: {
      //   type: DataTypes.INTEGER
      // },
      //   index_release: {
      //     type: DataTypes.INTEGER,
      //     primaryKey: true,
      //     allowNull: false,
      //     autoIncrement: true
      //   },
      //   labels: DataTypes.ARRAY(DataTypes.STRING),
      labels: DataTypes.JSONB,
      year: DataTypes.INTEGER,
      master_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      artists: DataTypes.JSONB,
      //   artists: DataTypes.ARRAY(DataTypes.STRING),
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      thumb: DataTypes.STRING,
      title: DataTypes.STRING,
      formats: DataTypes.JSONB,
      //   formats: DataTypes.ARRAY(DataTypes.STRING),
      cover_image: DataTypes.STRING,
      resource_url: DataTypes.STRING,
      master_id: DataTypes.INTEGER
    }

    // {
    //   indexes: [
    //     {
    //       unique: true,
    //       fields: ["index_release"]
    //     }
    //   ]
    // }
  );
  // Release.associate = function(models) {
  //   Release.hasMany(models.Instance, { onDelete: "cascade" });
  // };

  //   Release.associate = function (models) {
  //     Release.hasMany(models.Instance, {
  //         onDelete: 'cascade'
  //     })
  // }
  return Release;
};
