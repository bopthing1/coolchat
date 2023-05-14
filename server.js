require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const PORT = 9000;
const REPL_LINK = process.env.REPL_LINK;
const ALLOWED_SYMBOLS = ["_"];

const app = express();
const server = http.createServer(app);

app.use(cors());

async function doDBAction(action, method) {
	let dataRes;
	dataRes = await fetch(REPL_LINK + action, {
		method: method || "GET",
	})
		.then(async (resp) => {
			try {
				return await resp.json();
			} catch (err) {
				return await resp;
			}
		})
		.then(async (data) => {
			const actualData = await data;
			// console.log(typeof actualData);
			return actualData;
		})
		.catch((err) => console.log("fetch err: " + err));

	return dataRes;
}

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

function generateUserId() {
	return Math.floor(100000000 + Math.random() * 900000000);
}

async function isUsernameTaken(username) {
	const accounts = await doDBAction("list");
	// console.log(accounts);

	for (let i = 0; i < accounts.length; i++) {
		const accountName = accounts[i];
		let account = await doDBAction("get/" + accountName);
		account = JSON.parse(account);

		const thisUsername = account.username;
		console.log(thisUsername);
		if (thisUsername === username) {
			return account;
		}
	}

	return false;
}

async function isAccount(username, password) {
	const accounts = await doDBAction("list");

	for (let i = 0; i < accounts.length; i++) {
		const accountKey = accounts[i];
		let account = await doDBAction("get/" + accountKey);
		account = JSON.parse(account);

		const thisUsername = account.username;
		const thisPassword = account.password;

		if (thisUsername === username && thisPassword === password) {
			return account;
		}
	}

	return false;
}

async function validateSignup(username, password) {
	return new Promise(async (resolve, reject) => {
		if (!username || !password) {
			reject("please fill out your username and password");
		}

		if (username.length > 20) {
			reject("your username must be 20 characters or under");
		}

		if ((await isUsernameTaken(username)) === true) {
			reject("your username is taken");
		}

		for (let i = 0; i < username.length; i++) {
			const char = username[i];

			if (char.toLowerCase() === char.toUpperCase() && !char.toString()) {
				//is a symbol
				if (!ALLOWED_SYMBOLS[char]) {
					reject("the only symbols your username can have are underscores");
				}
			}
		}

		return resolve(
			"your account has been succesfully created. you may now close this modal"
		);
	});
}

io.on("connection", (socket) => {
	console.log("new connection!");

	socket.emit("checkLoginLocalstorage");

	socket.on("isChannelValid", (channelId) => {
		const channel = doDBAction("get/c_" + channelId);
		if (channel) {
			socket.emit("channelValidSuccess", channel);
		}
	});

	socket.on("signup", async (data) => {
		const username = data.username;
		const password = data.password;

		await validateSignup(username, password)
			.then(async (message) => {
				socket.emit("credStatus", {
					status: message,
					err: false,
				});

				console.log(message);

				const userData = {
					username: username,
					password: password,
					accountId: generateUserId(),
					channelsJoined: [],
				};

				// const get = await doDBAction("list");
				// console.log(get);
				const result = await doDBAction(
					`set/U_${userData.accountId}/${JSON.stringify(userData)}`,
					"POST"
				);

				console.log(result);

				socket.emit("loginSuccess", userData);
			})
			.catch(async (why) => {
				console.log(why);
				socket.emit("credStatus", {
					status: why,
					err: true,
				});
			});
	});

	socket.on("login", async (data) => {
		const username = data.username;
		const password = data.password;

		const account = await isAccount(username, password);

		// console.log(account);

		if (account) {
			socket.emit("credStatus", {
				status: "login succesful. you may close this modal",
				err: false,
			});

			socket.emit("loginSuccess", account);
		} else {
			socket.emit("credStatus", {
				status: "invalid username or password",
				err: true,
			});
		}
	});

	socket.on("logout", () => {
		socket.emit("logoutSuccess");
	});
});

server.listen(PORT, () => console.log("listening on port " + PORT));
