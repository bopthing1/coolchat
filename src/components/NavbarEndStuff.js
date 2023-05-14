import Nav from "react-bootstrap/Nav";
import AccountDropdown from "./AccountDropdown";
import socket from "../socket";
import { Person } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";
import { Component, useEffect, useState } from "react";

import CredModal from "./CredModal";

function NavbarEndStuff(props) {
	let [signupOpen, setSignupOpen] = useState(false);
	let [loginOpen, setLoginOpen] = useState(false);

	let [accountName, setAccountName] = useState("");

	socket.on("loginSuccess", (account) => {
		setAccountName(account.username);
		console.log(account.username);
	});

	socket.on("logoutSuccess", () => {
		setAccountName("");
	});

	return (
		<>
			<CredModal
				visible={signupOpen}
				onCloseClicked={() => {
					setSignupOpen(!signupOpen);
					console.log("onCloseClicked ran!");
				}}
				type="signup"
			></CredModal>

			<CredModal
				visible={loginOpen}
				onCloseClicked={() => setLoginOpen(!loginOpen)}
				type="login"
			></CredModal>

			<Nav>
				<AccountDropdown visible={accountName !== ""} username={accountName} />
				<Nav.Link
					style={{ display: accountName === "" ? "inline-block" : "none" }}
					onClick={() => setSignupOpen(!signupOpen)}
				>
					signup
				</Nav.Link>
				<Nav.Link
					style={{ display: accountName === "" ? "inline-block" : "none" }}
					onClick={() => setLoginOpen(!loginOpen)}
				>
					login
				</Nav.Link>
			</Nav>
		</>
	);
}

export default NavbarEndStuff;
