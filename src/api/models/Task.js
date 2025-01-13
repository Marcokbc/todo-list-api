const { Model, DataTypes } = require("sequelize");

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("pending", "in_progress", "completed"),
          defaultValue: "pending",
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        completedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        priority: {
          type: DataTypes.ENUM("low", "medium", "high"),
          defaultValue: "medium",
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        categoryId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "Categories",
            key: "id",
          },
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "Task",
        tableName: "tasks",
        underscored: true,
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    this.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  }
}

module.exports = Task;
