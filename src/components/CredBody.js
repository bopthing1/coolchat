import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import CredForm from "./CredForm";

export default function CredBody(props) {
	const [errorMsg, setErrorMsg] = useState("uwuv");
	const [errorMsgDisplay, setErrorMsgDisplay] = useState("none");

	return (
		<Modal.Body>
			<CredForm type={props.type}>
				<Form.Group className="mb-3" controlId="formBasicUsername">
					<Form.Label>username:</Form.Label>
					<Form.Control type="email" placeholder="username" />
					<Form.Text style={{ display: errorMsgDisplay }}>{errorMsg}</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>password:</Form.Label>
					<Form.Control type="password" placeholder="password" />
				</Form.Group>
				<Button variant="primary" type="submit">
					submit
				</Button>
				<Button variant="secondary" onClick={() => props.onCloseClicked()}>
					nevermind
				</Button>
			</CredForm>
		</Modal.Body>
	);
}
