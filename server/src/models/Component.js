const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  identifier: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["button", "input-text", "select"],
  },
  customStyles: {
    backgroundColor: { type: String },
    color: { type: String },
    borderColor: { type: String },
    borderRadius: { type: Number },
    padding: {
      x: { type: Number },
      y: { type: Number },
    },
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

module.exports = mongoose.model("Component", componentSchema);
