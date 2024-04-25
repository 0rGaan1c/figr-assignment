const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

const updateUserDetails = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: {
          code: StatusCodes.NOT_FOUND,
          message: "User not found.",
        },
      });
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: {
          code: StatusCodes.UNAUTHORIZED,
          message: "Old password must be correct.",
        },
      });
    }

    const password = bcrypt.hashSync(newPassword, 5);

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        password,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateUser) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: {
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: "Failed to update user.",
        },
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: updateUser,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || "Failed to update user.",
      },
    });
  }
};

module.exports = { updateUserDetails };
