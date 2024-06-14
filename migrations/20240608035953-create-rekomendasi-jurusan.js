'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rekomendasi_jurusans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_juruasan: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
      kategori: {
        type: Sequelize.ENUM('IPA', 'IPS')
      },
      matematika: {
        type: Sequelize.INTEGER
      },
      bahasa_indonesia: {
        type: Sequelize.INTEGER
      },
      bahasa_inggris: {
        type: Sequelize.INTEGER
      },
      fisika: {
        type: Sequelize.INTEGER
      },
      kimia: {
        type: Sequelize.INTEGER
      },
      biologi: {
        type: Sequelize.INTEGER
      },
      geografi: {
        type: Sequelize.INTEGER
      },
      ekonomi: {
        type: Sequelize.INTEGER
      },
      sosiologi: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rekomendasi_jurusans');
  }
};