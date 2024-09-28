const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const connectDB = require("./src/config/db");
const coordinateRoutes = require("./src/routes/coordinates.routes");
const coordinateSocket = require("./src/sockets/coordinatesSockets");
const logger = require("./src/utils/logger");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Attach io to request object for use in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api", coordinateRoutes);

// WebSocket connection handler
coordinateSocket(io);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger(`Server is running on http://localhost:${PORT}`);
});
