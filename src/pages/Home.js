import socket from "../socket";
import init from "../accounts";
import { Outlet } from "react-router-dom";

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import CCNavbar from "../components/CCNavbar";
import React, { useState } from "react";
import ChannelCardContainer from "../components/ChannelCardContainer";
import LoadingScreen from "../components/LoadingScreen";
// import ChannelButtons from "../components/ChannelButtons";

const pathName = document.location.pathname;

function Home(props) {
	const [visible, setVisible] = useState(true);

	init();

	socket.on("updateMyChannels", () => {
		setVisible(false);
	});

	return (
		<>
			<div className="Home">
				<CCNavbar home />
				<ChannelCardContainer />
			</div>

			<LoadingScreen visible={visible}></LoadingScreen>
		</>
	);
}

export default Home;
