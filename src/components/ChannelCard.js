import { useState } from "react";
import { Card, Button } from "react-bootstrap";

export default function ChannelCard(props) {
	function onClick() {
		window.location.replace("/channel/" + props.channelId + "/");
	}

	return (
		<Card style={{ width: "18rem" }}>
			<Card.Body>
				<Card.Title>{props.title || "placeholder"}</Card.Title>
				<Card.Text>{props.description || "content here"}</Card.Text>
				<Button variant="primary" onClick={() => onClick()}>open channel</Button>
			</Card.Body>
		</Card>
	);
}
