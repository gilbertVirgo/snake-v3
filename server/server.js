/* eslint-disable no-case-declarations */
require("dotenv").config();

const WebSocket = require('ws');
const {PORT: port} = process.env;
const server = new WebSocket.Server({port}, () => console.log(`WebSocket server started on port ${port}`));
const Sock = require("./Sock");

server.on("connection", async socket => {
	console.log("New connection");

	const sock = new Sock({socket});
	await sock.init();

	console.log("Socket created");

	require("./router")(sock);
});