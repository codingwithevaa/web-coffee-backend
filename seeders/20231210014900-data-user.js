"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("vocasia123", saltRounds);
    await queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        nama: "admin",
        noTelepon: "081464683939",
        alamat: "Jakarta",
        isSeller: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
