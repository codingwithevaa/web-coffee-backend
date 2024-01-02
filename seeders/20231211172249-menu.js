"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Menus",
      [
        {
          namaMenu: "Beef Steak",
          kategori: "Makanan",
          harga: "20000",
          image: "Ini Gambar Beef Steak",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          namaMenu: "Kopi Hitam",
          kategori: "Minuman",
          harga: "9000",
          image: "Ini Gambar Kopi Hitam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Menus", null, {});
  },
};
