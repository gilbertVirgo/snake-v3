require("dotenv").config();

const WebSocket = require('ws');

const Game = require("./Game");

const server = new WebSocket.Server({ port: +process.env.PORT });

const games = [];

server.on('connection', socket => {
	socket.on("join", id => {
		const game = games.find(game => game.id === id);

		if(game) game.join(id)
		else socket.emit("error", "No game of that ID exists.");
	});

	socket.on("create", () => {
		const game = new Game();
	});

	socket.send('something');
});