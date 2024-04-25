const express = require("express");
const { tokenValidator } = require("../middlewares/tokenValidator");
const { updateUserDetails } = require("../controllers/user");
const router = express.Router();

router.patch("/", tokenValidator, updateUserDetails);

module.exports = router;
