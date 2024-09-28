const mongoose = require("mongoose");

const coordinateSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    metalDetected: {
      type: Boolean,
      default: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false, // Disable the __v field
  }
);

const Coordinate = mongoose.model("Coordinate", coordinateSchema);

module.exports = Coordinate;
