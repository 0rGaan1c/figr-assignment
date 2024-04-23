const express = require("express");
const { tokenValidator } = require("../middlewares/tokenValidator");
const {
  getAllProjectComponents,
  createComponent,
  updateComponent,
} = require("../controllers/component");
const router = express.Router();

router
  .route("/")
  .get(tokenValidator, getAllProjectComponents)
  .post(tokenValidator, createComponent);

router.route("/:id").patch(tokenValidator, updateComponent);

module.exports = router;
