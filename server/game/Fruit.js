const Entity = require("./Entity");
const Body = require("./Body");

class Fruit extends Entity {
    constructor({x, y}) {
        super({x, y, weight: 1});
    }

    die(player) {
        player.score++;
        this.dead = true;
    }

    tick() {
        if(this.dead) {
            const body = new Body(this, {
                x: this.x,
                y: this.y,
                weight: this.weight
            });

            return [body];
        } else return null;
    }
}

module.exports = Fruit;