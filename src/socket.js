import io from "socket.io-client";

const SERVER = "localhost:9000";

const socket = io.connect(SERVER);

socket.on("connection", () => {
	console.log("connected with server!");
});

export default socket;
