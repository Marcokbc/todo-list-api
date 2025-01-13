'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('tasks', 'category_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories', 
        key: 'id'
      },
      onDelete: 'SET NULL',  
      onUpdate: 'CASCADE'   
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('tasks', 'category_id');
  }
};
