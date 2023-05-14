import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import socket from "../socket";

export default function CredBody(props) {
	const [statusMsg, setStatusMsg] = useState("");
	const [statusMsgDisplay, setStatusMsgDisplay] = useState("none");
	const [statusMsgColor, setStatusMsgColor] = useState("");

	const [titleValue, setTitleValue] = useState("");
	const [descriptionValue, setDescriptionValue] = useState("");

	const [buttonsDisabled, setButtonsDisabled] = useState(false);

	function onSubmit(e) {
		e.preventDefault();

		const title = titleValue;
		const description = descriptionValue;

		if (localStorage.getItem("accountId")) {
			socket.emit("newChannel", {
				title: title,
				description: description,
				accountId: localStorage.getItem("accountId"),
			});
		}
	}

	return (
		<Modal.Body>
			<Form onSubmit={onSubmit} type={props.type}>
				<Form.Group className="mb-3">
					<Form.Label>title:</Form.Label>
					<Form.Control
						type="text"
						value={titleValue}
						placeholder="ex: Thug shaker central"
						maxLength="100"
						onChange={(e) => setTitleValue(e.target.value)}
					/>
					<Form.Text
						style={{ display: statusMsgDisplay, color: statusMsgColor }}
					>
						{statusMsg}
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>description (optional):</Form.Label>
					<Form.Control
						as="textarea"
						type="text"
						placeholder="an optional description that describes your channel"
						value={descriptionValue}
						onChange={(e) => setDescriptionValue(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit" disabled={buttonsDisabled}>
					create channel
				</Button>
				<Button
					variant="secondary"
					onClick={() => console.log(props)}
					disabled={buttonsDisabled}
				>
					close
				</Button>
			</Form>
		</Modal.Body>
	);
}
