import { Modal, Button } from "react-bootstrap";

export default function BasicModalFooter(props) {
	// console.log(props.onCloseClicked);

	return (
		<Modal.Footer>
			<Button variant="secondary" onClick={() => props.onCloseClicked()}>
				{props.closeText || "close"}
			</Button>
			<Button variant="primary" onClick={() => props.onCloseClicked()}>
				{props.closeText || "okay"}
			</Button>
		</Modal.Footer>
	);
}
