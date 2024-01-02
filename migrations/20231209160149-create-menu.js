"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Menus", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      namaMenu: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      kategori: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["makanan", "minuman"],
      },
      harga: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      image: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Menus");
  },
};
