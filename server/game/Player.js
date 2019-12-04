const Entity = require("./Entity");
const Body = require("./Body");
const Direction = require("./Direction");

class Player extends Entity {
    constructor({id, x, y}) {
        super({x, y, weight: 2});
        
        this.id = id;
        this.score = 0;
        this.direction = Direction.UP;
    }

    get getId() { return this.id }
    get getScore() { return this.score }

    set setId(id) { this.id = id }
    set setScore(score) { this.score = score }

    die() { this.dead = true; }

    turn(direction) { this.direction = direction }

    tick() {
        if(!this.dead) {
            this.move();

            const head = new Body(this, {x: this.x, y: this.y, dynamic: true});

            // Add head, remove tail
            this.bodies = [head, ...this.bodies.slice(0, -1)];

            return this.bodies;
        } else return null;
    }
}

module.exports = Player;