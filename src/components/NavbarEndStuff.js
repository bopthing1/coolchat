import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import { Person } from "react-bootstrap-icons";
import BasicModal from "./BasicModal";
import { Component, useEffect, useState } from "react";

function NavbarEndStuff(props) {
	let [signupOpen, setSignupOpen] = useState(false);
	let [loginOpen, setLoginOpen] = useState(false);

	function doit() {}

	useEffect(() => {
		setSignupOpen(!signupOpen);
	}, []);

	return (
		<>
			<BasicModal
				title="signup"
				text="signup"
				visible={signupOpen}
				onCloseClicked={setSignupOpen(false)} // fuck here be dragons
			></BasicModal>

			<Nav>
				<Person />
				<Nav.Link onClick={doit}>signup</Nav.Link>
				<Person />
				<Nav.Link onClick={setSignupOpen(!signupOpen)}>login</Nav.Link>
			</Nav>
		</>
	);
}

export default NavbarEndStuff;
