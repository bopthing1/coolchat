import socket from "./socket";
import infoModule from "./appInfo";

function loginClient(account) {
	infoModule.setValue("loginUsername", account.username);
	infoModule.setValue("loginPassword", account.password);
}

function logoutClient() {
	infoModule.removeValue("loginUsername");
	infoModule.removeValue("loginPassword");
}

export default function init() {
	socket.on("checkLoginLocalstorage", () => {
		const username = infoModule.getValue("loginUsername");
		const password = infoModule.getValue("loginPassword");

		console.log(username, password, true);

		socket.emit("login", {
			username: username,
			password: password,
		});
	});

	socket.on("loginSuccess", (account) => {
		loginClient(account);
	});

	socket.on("logoutSuccess", () => {
		logoutClient();
	});
}
