const express = require("express");
const { tokenValidator } = require("../middlewares/tokenValidator");
const router = express.Router();
const {
  getUserProjects,
  createProject,
  updateProject,
  getProjectById,
} = require("../controllers/project");

router
  .route("/")
  .get(tokenValidator, getUserProjects)
  .post(tokenValidator, createProject);

router
  .route("/:id")
  .get(tokenValidator, getProjectById)
  .patch(tokenValidator, updateProject);

module.exports = router;
