module.exports = (sequelize, DataTypes) => {
    const Record = sequelize.define('Record', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Record;
  };
  
  