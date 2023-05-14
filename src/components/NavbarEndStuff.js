import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import { Person } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";
import { Component, useEffect, useState } from "react";

import CredModal from "./CredModal";

function NavbarEndStuff(props) {
	let [signupOpen, setSignupOpen] = useState(false);
	let [loginOpen, setLoginOpen] = useState(false);

	return (
		<>
			<CredModal
				visible={signupOpen}
				onCloseClicked={() => setSignupOpen(!signupOpen)}
				type="signup"
			></CredModal>

			<CredModal
				visible={loginOpen}
				onCloseClicked={() => setLoginOpen(!loginOpen)}
				type="login"
			></CredModal>

			<Nav>
				<Person />
				<Nav.Link onClick={() => setSignupOpen(!signupOpen)}>signup</Nav.Link>
				<Person />
				<Nav.Link onClick={() => setLoginOpen(!loginOpen)}>login</Nav.Link>
			</Nav>
		</>
	);
}

export default NavbarEndStuff;
