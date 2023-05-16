import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CCNavbar from "../components/CCNavbar";

import { useParams } from "react-router-dom";

export default function ErrorPage() {
	const { err } = useParams();

	const messages = {
		"404": "404 page not found. pls go somehere else :(",
		"invalid-channel": "invalid channel. either you don't have permission to join this channel or this channel doesnt exist :'("
	}

	return (
		<>
			<CCNavbar></CCNavbar>
			<h1 class="error-h1">{messages[err] || messages["404"]}</h1>
		</>
	)
}
