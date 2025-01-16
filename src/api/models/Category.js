/**
 * @schema Category
 * properties:
 *   name:
 *     type: string
 *     required: true
 *     description: The name of the category
 *   description:
 *     type: string
 *     required: true
 *     description: The detailed description of the category
 */

const { Sequelize, DataTypes, Model } = require("sequelize");

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Category",
        tableName: "categories",
        underscored: true,
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Task, {
      foreignKey: "category_id",
      as: "tasks",
    });
  }
}

module.exports = Category;
