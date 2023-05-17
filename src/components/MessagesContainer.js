import { useState } from "react";
import socket from "../socket";

import Message from "./Message";

export default function MessagesContainer(props) {
	let [messages, setMessages] = useState({
		messages: [],
		channel: null,
	});

	socket.on("updateMessages", (data) => {
		const channel = data.channel;
		const messages = data.messages;

		if (channel === props.currentChannel) {
			setMessages(messages);
		}
	});

	return (
		<div id="messages">
			{messages.forEach((m) => {
				return <Message content={m.content} author={m.author} />;
			})}
		</div>
	);
}
