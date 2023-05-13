import { Container } from "react-bootstrap";

export default function Message(props) {
	return (
		<Container key={props.key} className="message">
			{props.content}
		</Container>
	);
}
