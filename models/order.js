"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "userID", onDelete: "CASCADE", onUpdate: "CASCADE" });
      Order.hasMany(models.OrderMenu, { foreignKey: "orderID", onDelete: "CASCADE", onUpdate: "CASCADE" });
    }
  }
  Order.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        },
      },
      totalHarga: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
