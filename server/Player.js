const Entity = require("./Entity");
const Body = require("./Body");

class Player extends Entity {
    constructor({id, x, y}) {
        super({x, y, weight: 2});
        
        this.id = id;
        this.score = 0;
    }

    die() { this.dead = true; }

    turn(direction) { this.direction = direction }

    tick() {
        if(!this.dead) {
            this.move();

            const head = new Body({x: this.x, y: this.y});

            // Add head, remove tail
            this.bodies = [head, ...this.bodies.slice(0, -1)];

            return this.bodies;
        } 
    }
}

module.exports = Player;