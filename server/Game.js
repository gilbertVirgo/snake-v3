const randomstring = require("randomstring");

const genID = () => randomstring.generate(10);

class Game {
    width = 400;
    height = 400;
    players = [];

    constructor(roomSize) {
        this.id = genID();
        this.roomSize = roomSize;
    }

    join(id) {
        if(--this.roomSize) {
            const player = new 

            this.players.push(id);
        }
    }

    init(players) {
        this.players = players.forEach(id => {
            
        });
    }
}

module.exports = Game;