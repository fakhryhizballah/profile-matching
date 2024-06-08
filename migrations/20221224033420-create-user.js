'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nohp: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      username: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      fullname: {
        type: Sequelize.STRING
      },
      email: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      pic: {
        type: Sequelize.STRING
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
    queryInterface.addIndex('Users', ['gid'], {
      indexName: 'gid'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};