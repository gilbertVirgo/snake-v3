const Game = require("./game/Game");
const Direction = require("./game/Direction");
const Sock = require("./Sock");

// SERVER

const init = (room, game) => {
    room.on("join", playerId => {
        game.join(playerId);
    });

    room.on("start", () => {
        game.start(room);
    });

    room.on("turn", ({direction, playerId}) => {
        const player = game.entities.find(({id}) => id === playerId);

        player.turn(Direction[direction.toUpperCase()]);
    });
}

module.exports = (function Router(sock) {
    const games = [];

    // const getGame = gameId => games.find(game => game.id === gameId);
    // const getPlayer = (playerId, game) => game.entities.find(entity => entity.id === playerId);

    console.log("Router initted");

    sock.on("create", async () => {
        console.log("New game created.");

        const game = new Game({roomSize: 4});
        games.push(game);

        sock.emit("room", game.id);

        const room = new Sock({url: "ws://localhost:5000", channel: game.id});    
        
        await room.init();

        init(room, game);
    });
})