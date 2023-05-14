import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import CredForm from "./CredForm";

export default function CredBody(props) {
	return (
		<Modal.Body>
			<CredForm
				onCloseClicked={props.onCloseClicked}
				type={props.type}
			></CredForm>
		</Modal.Body>
	);
}
