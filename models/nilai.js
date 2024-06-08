'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nilai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nilai.init({
    gid: DataTypes.STRING,
    kategori: DataTypes.ENUM('IPA', 'IPS'),
    matematika: DataTypes.INTEGER,
    bahasa_indonesia: DataTypes.INTEGER,
    bahasa_inggris: DataTypes.INTEGER,
    fisika: DataTypes.INTEGER,
    kimia: DataTypes.INTEGER,
    biologi: DataTypes.INTEGER,
    geografi: DataTypes.INTEGER,
    ekonomi: DataTypes.INTEGER,
    sosiologi: DataTypes.INTEGER,
    sejarah: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'nilai',
  });
  return nilai;
};