import { useState } from "react";
import { Card, Button } from "react-bootstrap";

export default function ChannelCard(props) {
	const [shadow, setShadow] = useState(false);

	function shadowShit(mode) {
		console.log(mode);
		setShadow(mode ? true : false);
	}

	return (
		<Card style={{ width: "18rem" }}>
			<Card.Body>
				<Card.Title>{props.title || "placeholder"}</Card.Title>
				<Card.Text>{props.content || "content here"}</Card.Text>
				<Button variant="primary">open channel</Button>
			</Card.Body>
		</Card>
	);
}
