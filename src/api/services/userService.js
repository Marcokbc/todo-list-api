const readExcel = require("../../utils/readExcel");
const userRepository = require("../repositories/userRepository");
const UserRepository = require("../repositories/userRepository");
const moment = require("moment");

class UserService {
  async findAllUsers() {
    const users = await UserRepository.findAllUsers();
    if (!users || users.length === 0) {
      throw new Error("No users found");
    }
    return users;
  }

  async findUserById(id) {
    const user = await UserRepository.findUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async findUserByName(name) {
    const users = await UserRepository.findUsersByName(name);
    if (!users || users.length === 0) {
      throw new Error("No users found with the specified name");
    }
    return users;
  }

  async findUserStats() {
    const usersStats = userRepository.findUserStats();
    if (!usersStats || usersStats.length === 0) {
      throw new Error("No users stats");
    }

    return usersStats;
  }

  async findRecentUsers() {
    const recentUsers = userRepository.findRecentUsers();
    if (!recentUsers || recentUsers.length === 0) {
      throw new Error("No recent users");
    }

    return recentUsers;
  }

  async findUsersGrowth() {
    const usersGrowth = userRepository.findUserGrowth();
    if (!usersGrowth || usersGrowth.length === 0) {
      throw new Error("No users growth");
    }

    return usersGrowth;
  }

  async downloadUsersReport() {
    const usersStats = await userRepository.findUserStats();
    const recentUsers = await userRepository.findRecentUsers();
    const usersGrowth = await userRepository.findUserGrowth();

    const userStatsSheet = [];
    const recentUsersSheet = [];
    const usersGrowthSheet = [];

    userStatsSheet.push({
      metric: "Total Users",
      value: usersStats.totalUsers,
    });

    userStatsSheet.push({
      metric: "Active Users",
      value: usersStats.activeUsers,
    });

    usersStats.userByRole.forEach((userRole) => {
      userStatsSheet.push({
        metric: `Users with role: ${userRole.role}`,
        value: userRole?.count ?? 0,
      });
    });

    recentUsers.forEach((recentUser) => {
      recentUsersSheet.push({
        name: recentUser.name,
        email: recentUser.email,
        createdAt: recentUser.createdAt,
      });
    });

    usersGrowth.forEach((userGrowth) => {
      usersGrowthSheet.push({
        month: moment(userGrowth.month).format("YYYY-MM"),
        count: userGrowth.count,
      });
    });

    const newBook = readExcel.createNewBook();

    readExcel.appendNewSheetToBook("Users Stats", userStatsSheet, newBook);
    readExcel.appendNewSheetToBook("Recent Users", recentUsersSheet, newBook);
    readExcel.appendNewSheetToBook("Users Growth", usersGrowthSheet, newBook);

    const buffer = await readExcel.writeBook(newBook);

    return buffer;
  }

  async createUser(userData) {
    const existingUser = await UserRepository.findUserByEmail(
      userData.email,
      userData.username
    );
    if (existingUser) {
      throw new Error("Email or Username already registered");
    }

    return await UserRepository.createUser(userData);
  }

  async updateUser(id, updatedData) {
    const user = await UserRepository.findUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await UserRepository.updateUser(user, updatedData);
  }

  async deleteUser(id) {
    const user = await UserRepository.findUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await UserRepository.deleteUser(user);
    return { message: "User deleted successfully" };
  }
}

module.exports = new UserService();
