import { Modal, ModalHeader } from "react-bootstrap";
import BasicModalFooter from "./BasicModalFooter";
import SignupModalFooter from "./SignupModalFooter";
import CredForm from "./CredForm";
import CredBody from "./CredBody";

export default function SignupModal(props) {
	// console.log(props.onCloseClicked);

	return (
		<Modal show={props.visible}>
			<ModalHeader></ModalHeader>
			<CredBody
				type={props.type}
				onCloseClicked={() => props.onCloseClicked()}
			></CredBody>
		</Modal>
	);
}
