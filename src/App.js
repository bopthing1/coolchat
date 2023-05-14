import socket from "./socket";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CCNavbar from "./components/CCNavbar";
import React, { ReactDOM } from "react";
import MessagesContainer from "./components/MessagesContainer";
import Chatbox from "./components/Chatbox";
import ChannelCardContainer from "./components/ChannelCardContainer";
import ChannelCard from "./components/ChannelCard";

const pathName = document.location.pathname;

function App() {
	if (pathName === undefined || pathName === "/") {
		return (
			<div className="App bg-dark">
				<CCNavbar></CCNavbar>
				<ChannelCardContainer></ChannelCardContainer>
			</div>
		);
	} else if (pathName.includes("channel")) {
		const splittedPathName = pathName.split("/");
		const channelId = splittedPathName[2];
		if (channelId !== undefined && channelId !== "") {
			console.log("checking channel...");
			socket.emit("isChannelValid", parseInt(channelId));
			socket.on("channelValidSuccess", () => {
				return (
					<div className="App bg-dark">
						<CCNavbar></CCNavbar>
						<MessagesContainer></MessagesContainer>
						<Chatbox></Chatbox>
					</div>
				);
			});
		} else {
			window.location.href = "http://localhost:3000";
		}
	}
}

export default App;
