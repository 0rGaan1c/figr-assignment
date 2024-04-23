const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const tokenValidator = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          error: {
            code: StatusCodes.UNAUTHORIZED,
            message: "Invalid Token, Please login again.",
          },
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      error: {
        code: StatusCodes.UNAUTHORIZED,
        message: "Unauthorized access. No token provided.",
      },
    });
  }
};

module.exports = { tokenValidator };
