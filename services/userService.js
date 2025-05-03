const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { formatSuccessResponse, formatErrorResponse } = require("../utils/api");
const { httpStatus } = require("../utils/constants");

// Password hashing utils
const hashPassword = (password) => {
  if (!password) {
    return null;
  }
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  return hash;
};
// Password hashing utils end

// JWT utils
const generateTokenPairForUser = (user) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
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

// JWT utils end

const signUpUser = async (req, res) => {
  try {
    const userRequest = req.body;
    if (!(userRequest?.email && userRequest?.password)) {
      const { status, message } = formatErrorResponse(
        "Both email and password are required. Validation failed.",
        null,
        httpStatus.BAD_REQUEST
      );
      res.status(status).json({ message });
      return;
    }

    // Check if email is already registered
    const existingCount = await User.countDocuments({
      email: userRequest.email,
    });

    if (existingCount > 0) {
      const { status, message } = formatErrorResponse(
        "User with email already exists.",
        null,
        httpStatus.BAD_REQUEST
      );
      res.status(status).json({ message });
      return;
    }

    const passwordHashedUser = {
      ...userRequest,
      password: hashPassword(userRequest.password),
    };
    const user = new User(passwordHashedUser);

    if (user.validateSync()) {
      const { status, message } = formatErrorResponse(
        "User validation before registration failed. Please try again.",
        null,
        httpStatus.BAD_REQUEST
      );
      res.status(status).json({ message });
      return;
    }

    // Save user
    const savedUser = await user.save();

    const { status, result } = formatSuccessResponse(
      `User ${savedUser.email} registration successful.`,
      httpStatus.CREATED
    );
    res.status(status).json(result);
    return;
  } catch (err) {
    console.error(err);
    const { status, message, error } = formatErrorResponse(
      "Registration failed. Please try again.",
      err
    );
    res.status(status).send({ message, error });
    return;
  }
};

const signInUser = async (req, res) => {
  try {
    const userRequest = req.body;
    if (!(userRequest?.email && userRequest?.password)) {
      const { status, message } = formatErrorResponse(
        "Both email and password are required. Validation failed.",
        null,
        httpStatus.BAD_REQUEST
      );
      res.status(status).json({ message });
      return;
    }
    const passwordHashedUser = {
      ...userRequest,
      password: hashPassword(userRequest.password),
    };

    const matchedUser = await User.findOne({
      email: passwordHashedUser.email,
      password: passwordHashedUser.password,
    }).lean();

    if (!matchedUser) {
      const { status, message } = formatErrorResponse(
        "No matching user found.",
        null,
        httpStatus.NOT_FOUND
      );
      res.status(status).json({ message });
      return;
    }

    // Generate token pair
    const tokens = generateTokenPairForUser(matchedUser);

    const { status, result } = formatSuccessResponse(tokens);
    res.status(status).json(result);
    return;
  } catch (err) {
    console.error(err);
    const { status, message, error } = formatErrorResponse(
      "Sign-in failed. Please try again.",
      err
    );
    res.status(status).send({ message, error });
    return;
  }
};

const getMyInformation = async (req, res) => {
  if (!req.headers.authorization) {
    const { status, message } = formatErrorResponse(
      "No authorization header found.",
      null,
      httpStatus.BAD_REQUEST
    );
    res.status(status).json({ message });
    return;
  }
  if (!req.headers.authorization.split(" ")[1]) {
    const { status, message } = formatErrorResponse(
      "Token not found.",
      null,
      httpStatus.BAD_REQUEST
    );
    res.status(status).json({ message });
    return;
  }
  try {
    const payload = verifyAccessToken(req.headers.authorization.split(" ")[1]);
    if (payload.id) {
      const user = await User.findById(payload.id).lean();
      const responseData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
      const { status, result } = formatSuccessResponse(responseData);
      res.status(status).json(result);
      return;
    }
    const { status, message, error } = formatErrorResponse(
      "Unable to resolve user information.",
      'USER_DATA_NOT_FOUND',
      httpStatus.NOT_FOUND
    );
    res.status(status).send({ message, error });
    return;
  } catch (err) {
    console.error(err);
    const { status, message, error } = formatErrorResponse(
      "Token validation failed.",
      err,
      httpStatus.UNAUTHORIZED
    );
    res.status(status).send({ message, error });
    return;
  }
};

module.exports = {
  signUpUser,
  signInUser,
  getMyInformation,
};
