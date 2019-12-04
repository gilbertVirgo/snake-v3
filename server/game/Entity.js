const Direction = require("./Direction");
const Body = require("./Body");

class Entity {
    constructor({x, y, direction = Direction.NONE, weight}) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.weight = weight;

        this.bodies = [new Body(this, {x, y})];
        this.dead = false;
    }

    get getX() { return this.x }
    set setX(x) { this.x = x }
    get getY() { return this.y }
    set setY(y) { this.y = y }
    get getDirection() { return this.direction }
    set setDirection(direction) { this.direction = direction }
    get getWeight() { return this.weight }
    set setWeight(weight) { this.weight = weight }
    get getBodies() { return this.bodies }
    set setBodies(bodies) { this.bodies = bodies }
    get getDead() { return this.dead }
    set setDead(dead) { this.dead = dead }

    move() {
        const [dx, dy] = this.direction;

        this.x += dx;
        this.y += dy;
    }
}

module.exports = Entity;