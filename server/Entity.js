const Direction = require("./Direction");
const Body = require("./Body");

class Entity {
    constructor({x, y, direction = Direction.NONE, weight}) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.weight = weight;

        this.bodies = [new Body({x, y})];
        this.dead = false;
    }

    move() {
        const [dx, dy] = this.direction;

        this.x += dx;
        this.y += dy;
    }

    // Writable properties
    set bodies(bodies) { this.bodies = bodies }
    set direction(direction) { this.direction = direction }
    set dead(dead) { this.dead = dead }
}

module.exports = Entity;