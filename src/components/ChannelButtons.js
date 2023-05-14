import { Button } from "react-bootstrap";
import CreateChannelModal from "./CreateChannelModal";
import { useState } from "react";
import infoModule from "../appInfo";

export default function NewChannelButton(props) {
	console.log(props);

	const [createChannelModalVisible, setCreateChannelModalVisible] =
		useState(false);
	const [joinChannelModalVisible, setJoinChannelModalVisible] = useState(false);

	function joinChannel() {}

	function createChannel() {
		setCreateChannelModalVisible(!createChannelModalVisible);
	}

	return (
		<>
			<CreateChannelModal
				visible={createChannelModalVisible}
				onCloseClicked={() => setCreateChannelModalVisible(false)}
			/>

			<div style={{ display: infoModule.isLoggedIn() ? "inline" : "none" }}>
				<Button variant="success" className="channel-button">
					join channel
				</Button>
				<Button
					variant="primary"
					className="channel-button"
					onClick={() => createChannel()}
				>
					create channel
				</Button>
			</div>
		</>
	);
}
