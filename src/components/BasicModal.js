import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import ModalHeader from "./ModalHeader";
import BasicModalFooter from "./BasicModalFooter";

export default function BasicModal(props) {
	return (
		<Modal show={props.visible}>
			<ModalHeader title={props.title}></ModalHeader>
			<Modal.Body>{props.text}</Modal.Body>
			<BasicModalFooter
				onCloseClicked={() => props.onCloseClicked()}
			></BasicModalFooter>
		</Modal>
	);
}
