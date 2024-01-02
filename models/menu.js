"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.hasMany(models.OrderMenu, { foreignKey: "menuID", onDelete: "CASCADE", onUpdate: "CASCADE" });
    }
  }
  Menu.init(
    {
      namaMenu: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      kategori: {
        type: DataTypes.ENUM,
        values: ["makanan", "minuman"],
        validate: {
          notEmpty: true,
        },
      },
      harga: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      image: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
