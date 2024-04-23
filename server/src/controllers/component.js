const Component = require("../models/Component");
const { StatusCodes } = require("http-status-codes");
const Project = require("../models/Project");

const getAllProjectComponents = async (req, res) => {
  const { projectId } = req.body;
  try {
    const components = await Component.find({ project: projectId });
    res.status(StatusCodes.OK).json({
      success: true,
      data: components,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || "Error retrieving components.",
      },
    });
  }
};

const createComponent = async (req, res) => {
  const { projectId } = req.body;

  try {
    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: {
          code: StatusCodes.NOT_FOUND,
          message:
            "Project not found. Cannot create component for a non-existent project.",
        },
      });
    }

    const componentData = {
      ...req.body,
      project: projectId,
    };
    const component = await Component.create(componentData);
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: component,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: {
        code: StatusCodes.BAD_REQUEST,
        message: error.message || "Failed to create component.",
      },
    });
  }
};

const updateComponent = async (req, res) => {
  const { id } = req.params;
  try {
    const component = await Component.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!component) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: {
          code: StatusCodes.NOT_FOUND,
          message: "Component not found.",
        },
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      data: component,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || "Failed to update component.",
      },
    });
  }
};

module.exports = {
  getAllProjectComponents,
  createComponent,
  updateComponent,
};
