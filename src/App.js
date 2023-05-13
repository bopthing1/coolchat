import socket from "./socket";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CCNavbar from "./components/CCNavbar";
import { Component } from "react";

function App() {
	return (
		<div className="App">
			<CCNavbar></CCNavbar>
		</div>
	);
}

export default App;
