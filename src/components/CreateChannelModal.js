import { Modal, Form } from "react-bootstrap";
import ModalHeader from "./ModalHeader";
import BasicModalFooter from "./BasicModalFooter";
import CreateChannelBody from "./CreateChannelBody";

export default function CreateChannelModal(props) {
	console.log(props);

	return (
		<Modal show={props.visible}>
			<ModalHeader
				title="create channel"
				onCloseClicked={() => props.onCloseClicked()}
			/>
			<CreateChannelBody onCloseClicked={() => props.onCloseClicked()} />
		</Modal>
	);
}
