import { Dropdown, NavItem } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import socket from "../socket";

export default function AccountDropdown(props) {
	function logout(e) {
		console.log("logout");
		socket.emit("logout");
	}

	return (
		<>
			<Dropdown as={NavItem}>
				<Dropdown.Toggle
					as={Nav.Link}
					style={{ display: props.visible ? "inline-block" : "none" }}
				>
					<PersonFill
						color="white"
						visibility={props.visible.toString()}
						style={{
							display:
								props.username !== ""
									? "inline-block !important"
									: "none !important",
						}}
					/>
					{props.username}
				</Dropdown.Toggle>
				<Dropdown.Menu style={{ width: "50% !important" }}>
					<Dropdown.Item onClick={(e) => logout(e)}>logout</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	);
}
