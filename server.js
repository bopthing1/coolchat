const cors = require("cors");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const PORT = 9000;
const REPL_LINK = "https://bs--datamandoug.repl.co/";

const app = express();
const server = http.createServer(app);

app.use(cors());

async function doDBAction(action) {
	await fetch(REPL_LINK + action)
		.then((resp) => resp)
		.then((data) => {
			console.log(data);
			return data;
		});
}

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("new connection!");

	socket.on("isChannelValid", (channelId) => {
		const channel = doDBAction("get/c_" + channelId);
		if (channel) {
			socket.emit("channelValidSuccess", channel);
		}
	});
});

server.listen(PORT, () => console.log("listening on port " + PORT));
