import { Modal, Button } from "react-bootstrap";

export default function BasicModalFooter(props) {
	console.log(props.onCloseClicked);

	return (
		<Modal.Footer>
			<Button variant="secondary" onClick={() => props.onCloseClicked()}>
				close
			</Button>
		</Modal.Footer>
	);
}
