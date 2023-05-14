import { Form } from "react-bootstrap";

export default function CredForm(props) {
	function onSubmit(e) {
		e.preventDefault();

		const type = props.type;
		console.log(type);

		socket.emit(type, {});
	}

	return <Form onSubmit={onSubmit}>{props.children}</Form>;
}
