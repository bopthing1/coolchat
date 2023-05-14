import { Button } from "react-bootstrap";

export default function NewChannelButton(props) {
	return (
		<>
			<Button variant="success" className="channel-button">
				join channel
			</Button>
			<Button variant="primary" className="channel-button">
				create channel
			</Button>
		</>
	);
}
