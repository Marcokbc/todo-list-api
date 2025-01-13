"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sex: {
        type: DataTypes.ENUM("M", "F"),
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      profile_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("admin", "basic"),
        defaultValue: "basic",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("users");
  },
};
