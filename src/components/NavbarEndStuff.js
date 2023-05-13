import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Person} from "react-bootstrap-icons";

function onSignupClick(e) {

}

function onLoginClick(e) {

}

export default function NavbarEndStuff() {
    return (
        <Nav>
            <Person />
            <Nav.Link onClick={onSignupClick}>signup</Nav.Link>
            <Person />
            <Nav.Link onClick={onLoginClick}>login</Nav.Link>
        </Nav>
    )
}