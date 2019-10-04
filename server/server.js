require("dotenv").config();

const WebSocket = require('ws');

const Game = require("./Game");

const {PORT: port} = process.env;

const server = new WebSocket.Server({port}, 
	() => console.log(`WebSocket server started on port ${port}`));

const games = [];

server.on('connection', socket => {
	socket.on("join", id => {
		const game = games.find(game => game.id === id);

		if(game) game.join(id)
		else socket.emit("error", "No game of that ID exists.");
	});

	socket.on("create", () => {
		const game = new Game();

		console.log(game);
	});

	socket.send('something');
});