import { useState } from "react";
import socket from "../socket";

import Message from "./Message";

export default function MessagesContainer(props) {
	let [messages, setMessages] = useState({
		messages: [],
		channel: null,
	});

	socket.on("updateMessages", (data) => {
		setMessages(data.messages);
	});

	return <div id="messages">{}</div>;
}
