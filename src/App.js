import socket from "./socket";
import init from "./accounts";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import CCNavbar from "./components/CCNavbar";
import React, { ReactDOM } from "react";
import MessagesContainer from "./components/MessagesContainer";
import Chatbox from "./components/Chatbox";
import ChannelCardContainer from "./components/ChannelCardContainer";
import ChannelCard from "./components/ChannelCard";
import ChannelButtons from "./components/ChannelButtons";

const pathName = document.location.pathname;

function App(props) {
	init();

	if (props.mode === "home") {
		return (
			<div className="App">
				<CCNavbar />
				<ChannelButtons></ChannelButtons>
				<ChannelCardContainer></ChannelCardContainer>
			</div>
		);
	} else if (props.mode === "channel") {
		return (
			<div className="App" channelId={props.channelId}>
				<CCNavbar></CCNavbar>
				<MessagesContainer></MessagesContainer>
				<Chatbox></Chatbox>
			</div>
		);
	}
}

export default App;
