import io from "socket.io-client";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CCNavbar from "./components/CCNavbar";
import { Component } from "react";

const SERVER = "localhost:9000";

function App() {
	const socket = io.connect(SERVER);

	socket.on("connection", () => {
		console.log("connected with server!");
	});

	return (
		<div className="App">
			<CCNavbar></CCNavbar>
		</div>
	);
}

export default App;
