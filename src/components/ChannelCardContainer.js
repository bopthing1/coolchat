import ChannelCard from "./ChannelCard";
import socket from "../socket";
import { useState } from "react";
import infoModule from "../appInfo";

export default function ChannelCardContainer(props) {
	let [channels, setChannels] = useState([]);

	socket.on("updateChannels", (data) => {
		setChannels(data);
	});

	return (
		<div
			id="channelCardContainer"
			style={{ display: infoModule.isLoggedIn() ? "inline" : "none" }}
		>
			{/* {channels.map((channel) => {
				const joinedChannels = socket.emit("getJoinedChannels");
			})} */}
			{/* {[1, 2, 3, 4, 5].map((e) => {
				return <ChannelCard></ChannelCard>;
			})} */}
		</div>
	);
}
