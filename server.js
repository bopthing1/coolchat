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

	if (typeof dataRes === "string") {
		dataRes = JSON.stringify(dataRes);
	}

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
	const accounts = await doDBAction("list/U_");
	// console.log(accounts);

	for (let i = 0; i < accounts.length; i++) {
		const accountName = accounts[i];
		let account = await doDBAction("get/" + accountName);
		account = JSON.parse(account);

		const thisUsername = account.username;
		// console.log(thisUsername);
		if (thisUsername === username) {
			return account;
		}
	}

	return false;
}

async function isAccount(username, password) {
	const accounts = await doDBAction("list/U_");
	// console.log(accounts);

	for (let i = 0; i < accounts.length; i++) {
		const accountKey = accounts[i];
		let account = await doDBAction("get/" + accountKey);
		account = JSON.parse(account);

		const thisUsername = account.username;
		const thisPassword = account.password;

		// console.log(accountKey);
		// console.log(thisUsername, thisPassword);
		if (thisUsername === username && thisPassword === password) {
			return account;
		}
	}

	return false;
}

async function addChannelToPersonChannelList(channelId, accountId) {
	let channel = await doDBAction("get/C_" + channelId);
	channel = JSON.parse(channel);
	let account = await doDBAction("get/U_" + accountId);
	account = JSON.parse(account);

	// console.log(typeof channel);

	// console.log(channel.title + " is now on " + accountId + "'s channelList");

	account.channelsJoined.push(channelId);
	channel.members.push(accountId);

	await doDBAction(
		"set/C_" + channel.channelId + "/" + JSON.stringify(channel),
		"POST"
	);

	// const channelRes = await doDBAction("get/C_" + channelId);
	// console.log("channelRes: " + channelRes);
}

async function validateSignup(username, password) {
	return new Promise(async (resolve, reject) => {
		if (!username || !password) {
			reject("please fill out your username and password");
		}

		if (username.length > 20) {
			reject("your username must be 20 characters or under");
		}

		if (username.length < 3) {
			reject("your username must be at least 3 characters");
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

async function validateChannel(title, owner) {
	return new Promise(async (resolve, reject) => {
		if (!title || !owner) {
			reject("title and owner must not be undefined");
		}

		if (title.length > 100) {
			reject("title must be less than 100 chars");
		}

		return resolve(
			"your channel has been succefully created. you may close this modal and enter your channel"
		);
	});
}

async function getChannels() {
	let result = [];
	const channels = await doDBAction("list/C_");
	// console.log("channels: " + channels);

	for (let i = 0; i < channels.length; i++) {
		const channelKey = channels[i];
		let channel = await doDBAction("get/" + channelKey);
		// channel = JSON.parse(channel);

		result.push(channel);
	}

	return result;
}

async function updateMyChannels(socket, accountId) {
	accountId = parseInt(accountId);
	const channels = await getChannels();
	let myChannels = [];

	channels.forEach((channel) => {
		channel = JSON.parse(channel);
		const members = channel.members;
		// console.log(typeof members[0], typeof accountId, members[parseInt(accountId)] || "NO");

		members.forEach((member) => {
			member = parseInt(member);
			if (parseInt(member) === accountId) {
				// console.log(channel + " is in " + accountId + "'s thingy")
				myChannels.push(channel);
			}
		});
	});

	socket.emit("updateMyChannels", myChannels);
}

io.on("connection", async (socket) => {
	console.log("new connection!");

	socket.emit("checkLoginLocalstorage");

	socket.on("isChannelValid", async (channelId) => {
		const channel = await doDBAction("get/C_" + channelId);

		if (channel) {
			socket.emit("channelValidSuccess", channel);
		} else {
			socket.emit("channelValidFail");
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

				// console.log(result);

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

	socket.on("login", async (data, auto) => {
		const username = data.username;
		const password = data.password;

		const account = await isAccount(username, password);

		// console.log("logging in...");

		if (account) {
			if (!auto) {
				socket.emit("credStatus", {
					status: "login succesful. you may close this modal",
					err: false,
				});
			}

			// console.log(account);

			socket.emit("loginSuccess", account);
			await updateMyChannels(socket, account.accountId);
		} else {
			if (!auto) {
				socket.emit("credStatus", {
					status: "invalid username or password",
					err: true,
				});
			}
		}
	});

	socket.on("logout", () => {
		socket.emit("logoutSuccess");
	});

	socket.on("newChannel", async (data) => {
		const title = data.title;
		const description = data.title;
		const owner = data.owner;
		const private = data.private;

		console.log("new channel");

		await validateChannel(title, owner)
			.then(async (message) => {
				socket.emit("channelStatus", {
					status: message,
					err: false,
				});

				socket.emit("channelSuccess");

				const channelData = {
					title: title,
					description: description,
					owner: owner,
					members: [],
					allowedPeople: [],
					messages: [],
					private: private,
					channelId: generateUserId(),
				};

				await doDBAction(
					`set/C_${channelData.channelId}/${JSON.stringify(channelData)}`,
					"POST"
				);

				await addChannelToPersonChannelList(channelData.channelId, owner);

				await updateMyChannels(socket, owner);
			})
			.catch(async (err) => {
				console.log(err);
				socket.emit("channelStatus", {
					status: err,
					err: true,
				});
			});
	});

	socket.on("hasPermsForChannel", async (accountId, channelId) => {
		channelId = parseInt(channelId);
		accountId = parseInt(accountId);
		let channel = await doDBAction("get/C_" + channelId);
		channel = JSON.parse(channel);

		if (channel) {
			const members = channel.members;
			// console.log(channel);

			let success = false;

			members.forEach((member) => {
				member = parseInt(member);
				// console.log(members, typeof member, typeof accountId)

				if (member === accountId) {
					console.log("yay! member is accountId");
					socket.emit("hasPermsForChannelSuccess", channel);
					success = true;
				}
			});

			if (!success) {
				socket.emit("hasPermsForChannelFailed", channel);
			}
		}
	});

	socket.on("getValidAccount", async (username, password) => {
		const account = await isAccount(username, password);

		if (account) {
			socket.emit("getValidAccountSuccess", account);
		} else {
			socket.emit("getValidAccountFail");
		}
	});

	socket.on("message", async (data) => {
		if (data.content && data.author && data.channelId) {
			const channel = await doDBAction("get/C_" + data.channelId);

			if (channel) {
				const messageData = {
					content: data.content,
					author: data.author,
				};

				const messages = channel.messages;
				messages.push(messageData);

				await doDBAction(`set/C_${data.channelId}/${JSON.stringify(channel)}`);

				socket.emit("updateMessages", {
					channel: data.channelId,
					messages: messages,
				});
			}
		}
	});
});

server.listen(PORT, () => console.log("listening on port " + PORT));
