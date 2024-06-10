'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      siswa.hasOne(models.rekomendasi_jurusan, { foreignKey: 'id', sourceKey: 'rekomendasi_jurusan_id', as: 'rekomendasi_jurusan' })
    }
  }
  siswa.init({
    gid: DataTypes.STRING,
    alamat: DataTypes.STRING,
    ttl: DataTypes.DATEONLY,
    jenis_kelamin: DataTypes.STRING,
    agama: DataTypes.STRING,
    asal_sekolah: DataTypes.STRING,
    nilai_rata_rata: DataTypes.DOUBLE,
    rekomendasi_jurusan_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'siswa',
  });
  return siswa;
};