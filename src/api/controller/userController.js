const httpResponses = require("http-responses");
const { findRecentUsers } = require("../repositories/userRepository");
const UserService = require("../services/userService");
const userSchema = require("../validations/userValidation");

module.exports = {
  async findUsers(req, res) {
    try {
      const users = await UserService.findAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async findUserById(req, res) {
    try {
      const user = await UserService.findUserById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async findUserByName(req, res) {
    try {
      const users = await UserService.findUserByName(req.params.name);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async findUserStats(req, res) {
    try {
      const usersStats = await UserService.findUserStats();
      return res.status(200).json(usersStats);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async findRecentUsers(req, res) {
    try {
      const recentUsers = await UserService.findRecentUsers();
      return res.status(200).json(recentUsers);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async findUsersGrowth(req, res) {
    try {
      const usersGrowth = await UserService.findUsersGrowth();
      return res.status(200).json(usersGrowth);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async downloadUsersReport(req, res) {
    try {
      const buffer = await UserService.downloadUsersReport();

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=users-report.xlsx"
      );
      return res.end(buffer);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async postUsers(req, res) {
    try {
      const {
        name,
        email,
        username,
        password,
        phoneNumber,
        birthDate,
        sex,
        active,
        profileImage,
        role,
      } = req.body;

      const newUser = await UserService.createUser({
        name,
        email,
        username,
        password,
        phoneNumber,
        birthDate,
        sex,
        active,
        profileImage,
        role,
      });
      return res.status(201).json(newUser);
    } catch (error) {
      if (error.message === "Email already registered") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },

  async putUsers(req, res) {
    try {
      const {
        name,
        email,
        username,
        password,
        phoneNumber,
        birthDate,
        sex,
        active,
        profileImage,
        role,
      } = req.body;
      const updatedUser = await UserService.updateUser(req.params.id, {
        name,
        email,
        username,
        password,
        phoneNumber,
        birthDate,
        sex,
        active,
        profileImage,
        role,
      });
      return res.status(200).json(updatedUser);
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },

  async deleteUsers(req, res) {
    try {
      const result = await UserService.deleteUser(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },
};
