import { Modal } from "react-bootstrap";

export default function ModalHeader(props) {
	console.log(props);

	return (
		<>
			<Modal.Header closeButton onClick={() => props.onCloseClicked()}>
				<Modal.Title>{props.title}</Modal.Title>
			</Modal.Header>
		</>
	);
}
