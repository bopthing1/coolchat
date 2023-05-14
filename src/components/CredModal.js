import { Modal, ModalHeader } from "react-bootstrap";
import BasicModalFooter from "./BasicModalFooter";
import SignupModalFooter from "./SignupModalFooter";
import CredForm from "./CredForm";
import CredBody from "./CreateChannelBody";

export default function CredModal(props) {
	console.log(props.onCloseClicked);

	return (
		<Modal show={props.visible}>
			<ModalHeader></ModalHeader>
			<Modal.Body>
				<CredForm
					type={props.type}
					onCloseClicked={() => props.onCloseClicked()}
				></CredForm>
			</Modal.Body>
		</Modal>
	);
}
