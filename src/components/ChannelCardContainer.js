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
			{/* {channels.map((channel) => {
				const joinedChannels = socket.emit("getJoinedChannels");
			})} */}
			{[1, 2, 3, 4, 5].map((e) => {
				return <ChannelCard></ChannelCard>;
			})}
		</div>
	);
}
