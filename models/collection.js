module.exports = function(sequelize, DataTypes) {
  const Collection = sequelize.define("Collection", {
    collection: {
      type: DataTypes.JSONB
    }
  });
  return Collection;
};
