/**
 * @schema Task
 * properties:
 *   title:
 *     type: string
 *     required: true
 *     description: The title of the task
 *   description:
 *     type: string
 *     required: true
 *     description: The detailed description of the task
 *   status:
 *     type: string
 *     enum:
 *       - pending
 *       - in_progress
 *       - completed
 *     default: pending
 *     description: The current status of the task
 *   startDate:
 *     type: string
 *     format: date-time
 *     required: true
 *     default: now
 *     description: The start date of the task
 *   endDate:
 *     type: string
 *     format: date-time
 *     required: true
 *     description: The end date of the task
 *   completedAt:
 *     type: string
 *     format: date-time
 *     required: false
 *     description: The date and time when the task was completed
 *   priority:
 *     type: string
 *     enum:
 *       - low
 *       - medium
 *       - high
 *     default: medium
 *     description: The priority level of the task
 *   userId:
 *     type: integer
 *     required: true
 *     description: The ID of the user who owns the task
 *   categoryId:
 *     type: integer
 *     required: false
 *     description: The ID of the category the task belongs to
 */

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
