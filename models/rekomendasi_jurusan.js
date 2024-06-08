'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rekomendasi_jurusan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rekomendasi_jurusan.init({
    nama_juruasan: DataTypes.STRING,
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
    modelName: 'rekomendasi_jurusan',
  });
  return rekomendasi_jurusan;
};