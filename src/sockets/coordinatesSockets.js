module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New WebSocket connection");

    // Handle any other socket events if needed

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });
  });
};
