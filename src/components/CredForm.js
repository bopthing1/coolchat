import { Form } from "react-bootstrap";

export default function CredForm(props) {
	function onSubmit(e) {
		const type = props.type;
		e.preventDefault();
	}

	return <Form onSubmit={onSubmit}>{props.children}</Form>;
}
