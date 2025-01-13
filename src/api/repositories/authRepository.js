const { Op } = require("sequelize");
const User = require("../models/User");

class AuthRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async findUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findUserByEmailOrUsername(usernameOrEmail) {
    return await User.findOne({
      where: {
        [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
    });
  }
}

module.exports = new AuthRepository();
