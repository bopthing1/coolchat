import socket from "./socket";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CCNavbar from "./components/CCNavbar";
import { Component } from "react";
import MessagesContainer from "./components/MessagesContainer";

function App() {
	return (
		<div className="App bg-dark">
			<CCNavbar></CCNavbar>
			<MessagesContainer></MessagesContainer>
		</div>
	);
}

export default App;
