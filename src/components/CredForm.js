import { Form, Button } from "react-bootstrap";
import socket from "../socket";
import { useState } from "react";

export default function CredForm(props) {
	const [statusMsg, setStatusMsg] = useState("");
	const [statusMsgDisplay, setStatusMsgDisplay] = useState("none");
	const [statusMsgColor, setStatusMsgColor] = useState("");

	const [usernameValue, setUsernameValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");

	const [buttonsDisabled, setButtonsDisabled] = useState(false);

	socket.on("credStatus", (data) => {
		// console.log(data);
		// console.log(data.err ? "rgb(255, 0, )" : "rgb(0, 255, 0)");
		setStatusMsg(data.status.toString());
		setStatusMsgDisplay("block");
		setStatusMsgColor(data.err ? "rgb(255, 0, 0)" : "rgb(0, 255, 0)");

		setButtonsDisabled(false);
	});

	socket.on("loginSuccess", (account) => {
		setButtonsDisabled(false);
	});

	function onSubmit(e) {
		e.preventDefault();

		const type = props.type;
		// console.log(usernameValue, passwordValue);

		setButtonsDisabled(true);

		socket.emit(type, {
			username: usernameValue,
			password: passwordValue,
		});
	}

	return (
		<>
			<Form onSubmit={onSubmit} type={props.type}>
				<Form.Label className="form-title">{props.type}</Form.Label>
				<Form.Group className="mb-3">
					<Form.Label>username:</Form.Label>
					<Form.Control
						type="text"
						value={usernameValue}
						placeholder="username"
						maxLength="20"
						onChange={(e) => setUsernameValue(e.target.value)}
					/>
					<Form.Text
						style={{ display: statusMsgDisplay, color: statusMsgColor }}
					>
						{statusMsg}
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>password:</Form.Label>
					<Form.Control
						type="password"
						placeholder="password"
						value={passwordValue}
						onChange={(e) => setPasswordValue(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit" disabled={buttonsDisabled}>
					{props.type}
				</Button>
				<Button
					variant="secondary"
					onClick={() => {
						// console.log(typeof props.onClosedClicked || "NULL");
						props.onCloseClicked();
					}}
					disabled={buttonsDisabled}
				>
					close
				</Button>
			</Form>
		</>
	);
}
