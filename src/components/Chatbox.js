import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import socket from "../socket";

export default function Chatbox(props) {
	const [messageValue, setMessageValue] = useState("");

	function onSubmit(e) {
		e.preventDefault();

		const archivedMessageContent = messageValue;
		let account;

		setMessageValue("");

		socket.emit(
			"getValidAccount",
			localStorage.getItem("loginUsername"),
			localStorage.getItem("loginPassword")
		);

		socket.on("getValidAccountSuccess", (account) => {
			socket.emit("message", {
				content: archivedMessageContent,
				author: account.accountId,
				channelId: props.channel,
			});
		});

		socket.on("getValidAccountFail", () => {
			console.log(
				localStorage.getItem("loginUsername"),
				localStorage.getItem("loginPassword")
			);
		});
	}

	return (
		<div id="chatboxDiv" className="bg-dark">
			<Form onSubmit={onSubmit}>
				<Form.Control
					required={true}
					autoComplete="off"
					autoCapitalize="off"
					maxLength={200}
					value={messageValue}
					onChange={(e) => setMessageValue(e.target.value)}
					placeholder="type anything here"
					id="chatbox"
					className=""
				></Form.Control>
			</Form>
		</div>
	);
}
