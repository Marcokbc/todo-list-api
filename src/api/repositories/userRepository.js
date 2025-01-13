const { Op, Sequelize } = require("sequelize");
const moment = require("moment");
const User = require("../models/User");
const Task = require("../models/Task");

class UserRepository {
  async findAllUsers() {
    return await User.findAll();
  }

  async findUserById(id) {
    return await User.findOne({
      where: { id },
      include: [
        {
          model: Task,
          as: "tasks",
        },
      ],
    });
  }

  async findUsersByName(name) {
    return await User.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  }

  async findUserStats() {
    const totalUsers = await User.count();

    const activeUsers = await User.count({
      where: {
        active: true,
      },
    });

    const userByRole = await User.findAll({
      attributes: [
        "role",
        [Sequelize.fn("COUNT", Sequelize.col("role")), "count"],
      ],
      group: ["role"],
    });

    const formattedUserByRole = userByRole.map((userRole) => ({
      role: userRole.role,
      count: parseInt(userRole.getDataValue("count"), 10),
    }));

    return { totalUsers, activeUsers, userByRole: formattedUserByRole };
  }

  async findRecentUsers() {
    return await User.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      attributes: ["name", "email", "createdAt"],
    });
  }

  async findUserGrowth() {
    const lastYear = moment().subtract(12, "months").toDate();

    const usersGrowth = await User.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("created_at")),
          "month",
        ],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      where: {
        createdAt: {
          [Op.gte]: lastYear,
        },
      },
      group: [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("created_at"))],
      order: [
        [
          Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("created_at")),
          "ASC",
        ],
      ],
      raw: true,
    });

    return usersGrowth.map((growth) => ({
      month: growth.month,
      count: parseInt(growth.count, 10),
    }));
  }

  async findUserByEmail(email, username) {
    return await User.findOne({
      where: { [Op.or]: [{ email: email }, { username: username }] },
    });
  }

  async createUser(userData) {
    return await User.create(userData);
  }

  async updateUser(user, updatedData) {
    return await user.update(updatedData);
  }

  async deleteUser(user) {
    return await user.destroy();
  }
}

module.exports = new UserRepository();
