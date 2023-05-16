import ChannelCard from "./ChannelCard";
import socket from "../socket";
import { useState } from "react";
import infoModule from "../appInfo";

export default function ChannelCardContainer(props) {
	let [channels, setChannels] = useState([]);

	socket.on("updateMyChannels", (data) => {
		console.log(data);
		setChannels(data);
	});

	return (
		<div
			id="channelCardContainer"
			style={{ display: infoModule.isLoggedIn() ? "inline" : "none" }}
		>
			{channels.map((channel) => {
				return <ChannelCard title={channel.title} description={channel.description} channelId={channel.channelId}></ChannelCard>
			})}
			{/* {[1, 2, 3, 4, 5].map((e) => {
				return <ChannelCard></ChannelCard>;
			})} */}
		</div>
	);
}
