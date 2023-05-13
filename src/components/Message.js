import { Card } from "react-bootstrap";

export default function Message(props) {
	return (
		<div className="message" left>
			<p className="author">
				{props.author || "NULLIFY"}
				<span className="date">({props.date || new Date().toString()})</span>
			</p>

			<p className="content">{props.content}</p>
		</div>
	);
}
