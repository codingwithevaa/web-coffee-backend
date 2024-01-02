"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderMenu.belongsTo(models.Order, { foreignKey: "orderID", onDelete: "CASCADE", onUpdate: "CASCADE" });
      OrderMenu.belongsTo(models.Menu, { foreignKey: "menuID", onDelete: "CASCADE", onUpdate: "CASCADE" });
    }
  }
  OrderMenu.init(
    {
      orderID: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        },
      },
      menuID: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
          min: 1,
        },
      },
      harga: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "OrderMenu",
    }
  );
  return OrderMenu;
};
