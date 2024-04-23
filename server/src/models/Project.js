const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  colors: {
    type: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    default: [
      { label: "Primary", value: "#0096FF" },
      { label: "Secondary", value: "#4cbb17" },
    ],
  },
  radius: {
    baseSize: {
      type: Number,
      required: true,
      default: 8,
      enum: [4, 8, 12, 16, 32],
    },
    multiplier: {
      type: Number,
      required: true,
      default: 2,
      enum: [1, 2],
    },
  },
  spacing: {
    baseSize: {
      type: Number,
      required: true,
      default: 12,
      enum: [6, 8, 12],
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Project", projectSchema);
