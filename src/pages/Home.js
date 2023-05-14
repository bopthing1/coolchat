import socket from "../socket";
import init from "../accounts";
import { Outlet } from "react-router-dom";

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import CCNavbar from "../components/CCNavbar";
import React, { ReactDOM } from "react";
import ChannelCardContainer from "../components/ChannelCardContainer";
import ChannelButtons from "../components/ChannelButtons";

const pathName = document.location.pathname;

function Home(props) {
	init();

	return (
		<>
			<div className="Home">
				<CCNavbar />
				<ChannelButtons></ChannelButtons>
				<ChannelCardContainer></ChannelCardContainer>
			</div>

			<div id="detail">
				<Outlet />
			</div>
		</>
	);
}

export default Home;