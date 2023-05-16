import socket from "../socket";
import init from "../accounts";
import { useParams } from "react-router-dom";

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import CCNavbar from "../components/CCNavbar";
import React, { useEffect, useState } from "react";
import MessagesContainer from "../components/MessagesContainer";
import Chatbox from "../components/Chatbox";
import ErrorPage from "./ErrorPage";
import LoadingScreen from "../components/LoadingScreen";

function Channel(props) {
	init();

	const { id } = useParams();
	const [visible, setVisible] = useState(false);
	const [loadingVisible, setLoadingVisible] = useState(true);

	useEffect(() => {
		socket.emit("isChannelValid", id);
		socket.emit("hasPermsForChannel", localStorage.getItem("accountId"), id);

		socket.on("channelValidSuccess", (channel) => {
			setVisible(true);
		});

		socket.on("channelValidFail", () => {
			window.location.replace("/error/invalid-channel");
		});

		socket.on("hasPermsForChannelFailed", () => {
			window.location.replace("/error/invalid-channel");
		});

		socket.on("hasPermsForChannelSuccess", () => {
			setLoadingVisible(false);
		});
	});

	return (
		<>
			<div
				className="Channel"
				channelId={id}
				style={{ display: visible ? "block" : "none" }}
			>
				<CCNavbar></CCNavbar>
				<MessagesContainer></MessagesContainer>
				<Chatbox></Chatbox>
				<p>{id || "NULL"}</p>
			</div>
		</>
	);
}

export default Channel;
