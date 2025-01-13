const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.isAuthorized = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }

    next();
  };
};

exports.verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) return res.status(401);

  try {
    var decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
