require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { formatMongooseErrorMessage } = require("../utils");

const signup = async (req, res) => {
  const { name, email, password: plainTextPassword } = req.body;

  if (
    !plainTextPassword ||
    (plainTextPassword && plainTextPassword.length < 6)
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: {
        code: StatusCodes.BAD_REQUEST,
        message: "Password should be at least 6 characters long.",
      },
    });
  }

  const password = bcrypt.hashSync(plainTextPassword, 5);

  try {
    const result = await User.create({
      name,
      email,
      password,
    });
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err.name);
    const formattedErrors = formatMongooseErrorMessage(err);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: {
        code: StatusCodes.BAD_REQUEST,
        errors: formattedErrors,
      },
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();

  if (!user || !password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      error: {
        code: StatusCodes.UNAUTHORIZED,
        message: "Invalid email or password.",
      },
    });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      data: {
        token,
        user: { userId: user._id, email: user.email, name: user.name },
      },
    });
  }

  return res.status(StatusCodes.UNAUTHORIZED).json({
    success: false,
    error: {
      code: StatusCodes.UNAUTHORIZED,
      message: "Invalid email or password.",
    },
  });
};

module.exports = {
  signup,
  login,
};
