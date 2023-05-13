import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import { Person } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";
import { Component, useEffect, useState } from "react";

import SignupModal from "./SignupModal";

function NavbarEndStuff(props) {
	let [signupOpen, setSignupOpen] = useState(false);
	let [loginOpen, setLoginOpen] = useState(false);

	return (
		<>
			<SignupModal
				visible={signupOpen}
				onCloseClicked={() => setSignupOpen(!signupOpen)}
			></SignupModal>

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
