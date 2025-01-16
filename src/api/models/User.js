/**
 * @schema User
 * properties:
 *   name:
 *     type: string
 *     default: ""
 *   email:
 *     type: string
 *     default: ""
 *   username:
 *     type: string
 *     default: ""
 *   password:
 *     type: string
 *     default: ""
 *   phoneNumber:
 *     type: string
 *     default: ""
 *   birthDate:
 *     type: string
 *     format: date
 *     default: null
 *   sex:
 *     type: string
 *     enum:
 *       - M
 *       - F
 *     default: null
 *   active:
 *     type: boolean
 *     default: true
 *   profileImage:
 *     type: string
 *     default: ""
 *   role:
 *     type: string
 *     enum:
 *       - admin
 *       - basic
 *     default: basic
 */
/**
 * @schema Login
 * properties:
 *   usernameOrEmail:
 *     type: string
 *     required: true
 *     description: Username or Email is required
 *   password:
 *     type: string
 *     required: true
 *     description: Password is required
 */

const { Sequelize, DataTypes, Model } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        birthDate: DataTypes.DATE,
        sex: DataTypes.ENUM("M", "F"),
        active: DataTypes.BOOLEAN,
        profileImage: DataTypes.STRING,
        role: {
          type: DataTypes.ENUM("admin", "basic"),
          defaultValue: "basic",
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        underscored: true,
        timestamps: true,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Task, {
      foreignKey: "user_id",
      as: "tasks",
    });
  }
}

module.exports = User;
