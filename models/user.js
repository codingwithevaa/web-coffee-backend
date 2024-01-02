"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, { foreignKey: "userID", onDelete: "CASCADE", onUpdate: "CASCADE" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isEmail: true, //Inputan harus berupa email
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: [8, 25], //Panjang password 8-25 digit
          notEmpty: true,
        },
      },
      nama: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      noTelepon: {
        type: DataTypes.STRING,
        validate: {
          len: [8, 15], //Panjang inputan nomor telepon 8-15 digit
        },
      },
      alamat: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
        },
      },
      isSeller: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user, option) {
          const saltRounds = 10;
          user.password = bcrypt.hashSync(user.password, saltRounds);
        },
      },
    }
  );
  return User;
};
