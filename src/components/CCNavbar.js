import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavbarEndStuff from "./NavbarEndStuff";
// import { Component, useState } from "react";
import ChannelButtons from "./ChannelButtons";

function CCNavbar(props) {
	return (
		<Navbar
			expand="lg"
			bg="dark"
			variant="dark"
			sticky="top"
			className="h-100 bg-dark"
		>
			<Container>
				<Navbar.Brand>coolChat😎</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">home</Nav.Link>
						
					</Nav>
					<Nav className="me-auto" style={{display: props.home ? "inline" : "none"}}>
						<ChannelButtons></ChannelButtons>
					</Nav>
					<NavbarEndStuff></NavbarEndStuff>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default CCNavbar;
