const { Sequelize, DataTypes, Model } = require("sequelize");
const { encryptPassword } = require("../../utils/encryptPassword");

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

    this.addHook("beforeCreate", async (user) => {
      user.password = await encryptPassword(user.password);
    });

    this.addHook("beforeUpdate", async (user) => {
      user.password = await encryptPassword(user.password);
    });
  }

  static associate(models) {
    this.hasMany(models.Task, {
      foreignKey: "user_id",
      as: "tasks",
    });
  }
}

module.exports = User;
