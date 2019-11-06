module.exports = function(sequelize, DataTypes) {
  const Collection = sequelize.define("Collection", {
    instance_id: {
      type: DataTypes.STRING
    }
  });
  return Collection;
};
