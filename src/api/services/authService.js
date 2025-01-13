const { comparePassword } = require("../../utils/encryptPassword");
const {
  generateToken,
  generateRefreshToken,
  verifyJWT,
  verifyRefreshToken,
} = require("../../utils/jwtUntil");
const authRepository = require("../repositories/authRepository");
const AuthRepository = require("../repositories/authRepository");

class AuthService {
  async register(userData) {
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
    } = userData;

    let existingUser =
      (await AuthRepository.findUserByEmail(email)) ||
      (await authRepository.findUserByEmailOrUsername(username));
    if (existingUser) {
      throw new Error("Email or Username already registered");
    }

    const newUser = await AuthRepository.createUser({
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

    const token = generateToken({
      id: newUser.id,
      role: newUser.role,
    });
    const refreshToken = generateRefreshToken({
      id: newUser.id,
      role: newUser.role,
    });
    return { token, refreshToken };
  }

  async login(usernameOrEmail, password) {
    const user = await AuthRepository.findUserByEmailOrUsername(
      usernameOrEmail
    );
    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = generateToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

    return { token, refreshToken };
  }

  async refreshToken(refreshToken) {
    try {
      const user = verifyRefreshToken(refreshToken);

      const token = generateToken({ user });
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new AuthService();
