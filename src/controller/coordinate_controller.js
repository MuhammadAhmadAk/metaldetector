const Coordinate = require("../model/coordinatesmodel");

// @desc    Store a new coordinate
// @route   POST /api/coordinates
// @access  Public
exports.storeCoordinate = async (req, res) => {
  try {
    // Log the incoming request body to see what data is being sent
    console.log("Received request body:", req.body);

    const { latitude, longitude, metalDetected } = req.body;

    // Validate the required fields
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      console.log("Invalid data:", req.body);
      return res.status(400).json({ error: "Invalid latitude or longitude" });
    }

    // Log to confirm valid data before saving
    console.log("Valid data received. Attempting to save:", {
      latitude,
      longitude,
      metalDetected,
    });

    const newCoordinate = await Coordinate.create({
      latitude,
      longitude,
      metalDetected: metalDetected || false, // Default to false if not provided
    });

    // Log the saved document
    console.log("New coordinate saved:", newCoordinate);

    // Emit the new coordinate to all connected WebSocket clients
    req.io.emit("new-coordinate", newCoordinate);

    // Send the response back to the client
    res.status(201).json(newCoordinate);
  } catch (err) {
    console.error("Error during saving:", err); // Log the error if saving fails
    res.status(500).json({ error: "Failed to store the coordinate" });
  }
};

// @desc    Get all coordinates
// @route   GET /api/coordinates
// @access  Public
exports.getAllCoordinates = async (req, res) => {
  try {
    const coordinates = await Coordinate.find({});
    res.status(200).json(coordinates);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve coordinates" });
  }
};

exports.deleteCoordinates = async (req, res) => {
  try {
    await Coordinate.deleteMany({});
    res.status(200).json({ message: "All coordinates deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete coordinates" });
  }
};
