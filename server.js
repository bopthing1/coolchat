const cors = require("cors");
const express = require("express");
const http = require("http");
const {Server} = require("socket.io");

const PORT = 9000;

const app = express();
const server = http.createServer(app);

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

;

io.on("connection", socket => {
    console.log("new connection!");
})

server.listen(PORT, () => console.log("listening on port " + PORT));

