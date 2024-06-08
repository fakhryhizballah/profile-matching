'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'gid',
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      status: {
        type: Sequelize.STRING
      },
      user_agent: {
        type: Sequelize.STRING
      },
      host: {
        type: Sequelize.STRING
      },
      remoteAddress: {
        type: Sequelize.STRING
      },
      refresh: {
        type: Sequelize.STRING
      },
      access: {
        type: Sequelize.STRING(400)
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
    await queryInterface.dropTable('Sessions');
  }
};