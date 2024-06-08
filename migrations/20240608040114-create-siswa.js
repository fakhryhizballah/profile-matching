'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('siswas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'gid',
        }

      },
      alamat: {
        type: Sequelize.STRING
      },
      ttl: {
        type: Sequelize.DATEONLY
      },
      jenis_kelamin: {
        type: Sequelize.STRING
      },
      agama: {
        type: Sequelize.STRING
      },
      asal_sekolah: {
        type: Sequelize.STRING
      },
      nilai_rata_rata: {
        type: Sequelize.INTEGER
      },
      rekomendasi_jurusan_id: {
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
    await queryInterface.dropTable('siswas');
  }
};