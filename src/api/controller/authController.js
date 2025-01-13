const AuthService = require("../services/authService");
const userSchema = require("../validations/userValidation");
const loginSchema = require("../validations/loginValidation");

module.exports = {
  async register(req, res) {
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
        role,
      } = req.body;
      const { token, refreshToken } = await AuthService.register({
        name,
        email,
        username,
        password,
        phoneNumber,
        birthDate,
        sex,
        active,
        role,
      });
      return res.status(201).json({ token, refreshToken });
    } catch (error) {
      if (error.message === "Email already registered") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { usernameOrEmail, password } = req.body;
      const { token, refreshToken } = await AuthService.login(
        usernameOrEmail,
        password
      );
      return res.status(200).json({ token, refreshToken });
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Invalid password") {
        return res.status(401).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      const token = await AuthService.refreshToken(refreshToken);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ fudeu: "de vex" });
    }
  },
};
