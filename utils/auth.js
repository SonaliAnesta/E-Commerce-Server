const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const hashPassword = (password) => {
  if (!password) {
    return null;
  }
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  return hash;
};

const generateTokenPairForUser = (user) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      // Expires in 1 hour
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      // Expires in 1 hour
      expiresIn: "3d",
    }
  );
  return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = { hashPassword, generateTokenPairForUser, verifyAccessToken };
