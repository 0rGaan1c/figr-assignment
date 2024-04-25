const Project = require("../models/Project");
const { StatusCodes } = require("http-status-codes");

const getUserProjects = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const projects = await Project.find({ owner: userId });
    res.status(StatusCodes.OK).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || "Error retrieving projects.",
      },
    });
  }
};

const createProject = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const projectData = {
      ...req.body,
      owner: userId,
    };
    const project = await Project.create(projectData);
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: {
        code: StatusCodes.BAD_REQUEST,
        message: error.message || "Failed to create project.",
      },
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: {
          code: StatusCodes.NOT_FOUND,
          message: "Project not found.",
        },
      });
    }

    if (project.owner.toString() !== userId) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        error: {
          code: StatusCodes.FORBIDDEN,
          message: "Access denied. Users can only update their own projects.",
        },
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(StatusCodes.OK).json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || "Failed to update project.",
      },
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: {
          code: StatusCodes.NOT_FOUND,
          message: "Project not found.",
        },
      });
    }

    if (project.owner.toString() !== userId) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        error: {
          code: StatusCodes.FORBIDDEN,
          message: "Access denied. Users can only access their own projects.",
        },
      });
    }

    const radiusEnums =
      Project.schema.path("radius.baseSize").validators[1].enumValues;
    const radiusMultiplierEnums =
      Project.schema.path("radius.multiplier").validators[1].enumValues;
    const spacingEnums =
      Project.schema.path("spacing.baseSize").validators[1].enumValues;

    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        project,
        enums: {
          radiusBaseSize: radiusEnums,
          radiusMultiplier: radiusMultiplierEnums,
          spacingBaseSize: spacingEnums,
        },
      },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || "Error retrieving project.",
      },
    });
  }
};

module.exports = {
  getUserProjects,
  createProject,
  updateProject,
  getProjectById,
};
