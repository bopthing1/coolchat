import socket from "./socket";
import infoModule from "./appInfo";

function loginClient(account) {
	infoModule.setValue("loginUsername", account.username);
	infoModule.setValue("loginPassword", account.password);
	infoModule.setValue("accountId", account.accountId);
}

function logoutClient() {
	infoModule.removeValue("loginUsername");
	infoModule.removeValue("loginPassword");
	infoModule.removeValue("accountId");
}

export default function init() {
	socket.on("checkLoginLocalstorage", () => {
		if (infoModule.isLoggedIn()) {
			const username = infoModule.getValue("loginUsername");
			const password = infoModule.getValue("loginPassword");

			// console.log(username, password, true);

			socket.emit("login", {
				username: username,
				password: password,
			});
		}
	});

	socket.on("loginSuccess", (account) => {
		loginClient(account);
	});

	socket.on("logoutSuccess", () => {
		logoutClient();
	});
}
