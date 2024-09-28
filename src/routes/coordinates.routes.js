const express = require("express");
const {
  storeCoordinate,
  getAllCoordinates,
  deleteCoordinates,
} = require("../controller/coordinate_controller");

const router = express.Router();

// Route to store a new coordinate
router.post("/coordinates", storeCoordinate);

// Route to get all coordinates
router.get("/coordinates", getAllCoordinates);

router.delete("/coordinates", deleteCoordinates);

module.exports = router;
