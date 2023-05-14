import ChannelCard from "./ChannelCard";
import socket from "../socket";
import { useState } from "react";

export default function ChannelCardContainer(props) {
	let [channels, setChannels] = useState([]);

	socket.on("updateChannels", (data) => {
		setChannels(data);
	});

	return (
		<div id="channelCardContainer">
			{channels.map((channel) => {
				const joinedChannels = socket.emit("getJoinedChannels");
			})}
		</div>
	);
}
