const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const PORT = 9000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "https://example.com",
      methods: ["GET", "POST"]
    }
  });

io.on("connection", socket => {
    console.log("new connection!");
})

app.listen(PORT, () => console.log("listening on port " + PORT));

