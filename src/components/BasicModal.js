import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function BasicModal(props) {
	return (
		<Modal show={props.visible}>
			<Modal.Header closeButton>
				<Modal.Title>{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.text}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => props.onCloseClicked()}>
					{props.closeText || "close"}
				</Button>
				<Button variant="primary" onClick={() => props.onCloseClicked()}>
					{props.closeText || "okay"}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
