import { Form, Button } from "react-bootstrap";

export default function Chatbox(props) {
	function onSubmit(e) {}

	return (
		<div id="chatboxDiv" className="bg-dark">
			<Form onSubmit={onSubmit}>
				<Form.Control
					required={true}
					maxLength={200}
					placeholder="type anything here"
					id="chatbox"
				></Form.Control>
			</Form>
		</div>
	);
}
