'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Previlage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Previlage.hasOne(models.Level, { foreignKey: 'id', as: 'Level' })
      Previlage.hasOne(models.User, { foreignKey: 'gid', sourceKey: 'gid', as: 'User' })
      Previlage.hasOne(models.siswa, { foreignKey: 'gid', sourceKey: 'gid', as: 'siswa' })
    }

  }
  Previlage.init({
    gid: DataTypes.STRING,
    lvid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Previlage',
  });
  return Previlage;
};