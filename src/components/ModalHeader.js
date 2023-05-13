import { Modal } from "react-bootstrap";

export default function ModalHeader(props) {
	return (
		<Modal.Header closeButton>
			<Modal.Title>{props.title}</Modal.Title>
		</Modal.Header>
	);
}
