require("dotenv").config();

const rs = require("randomstring");
const rn = require("random-number");

const Player = require("./Player");
const Bounds = require("./Bounds");
const Fruit = require("./Fruit");

const genID = () => rs.generate(10);

const isIterable = obj => {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

class Game {
    constructor({roomSize}) {
        this.available = roomSize;

        this.id = genID();
        this.running = false;
        this.width = 40; // Figure this out
        this.height = 40;
        this.scale = 10;
        this.bodies = [];
        this.entities = [];
    }

    get getId() { return this.id }
    set setId(id) { this.id = id }
    get getRunning() { return this.running }
    set setRunning(running) { this.running = running }
    get getWidth() { return this.width }
    set setWidth(width) { this.width = width }
    get getHeight() { return this.height }
    set setHeight(height) { this.height = height }
    get getScale() { return this.scale }
    set setScale(scale) { this.scale = scale }
    get getBodies() { return this.bodies }
    set setBodies(bodies) { this.bodies = bodies }
    get getEntities() { return this.entities }
    set setEntities(entities) { this.entities = entities }

    genPos() {
        let intersects = true, x, y;
    
        const rand = max => rn({min: 0, max, integer: true});
    
        while(intersects) {
            [x, y] = [rand(this.width), rand(this.height)];
    
            intersects = !!this.bodies.find(body => 
                (body.x === x) && (body.y === y));
        }
    
        return [x, y];
    }

    genFruit() {
        const [x, y] = this.genPos();

        return new Fruit({x, y});
    }

    genBounds() {
        const bounds = new Bounds({
            width: this.width, 
            height: this.height
        });

        return bounds.generate();
    }

    join(id) {
        const exists = this.entities.find(entity => entity.id === id);

        if(--this.available > 0) {
            if(!exists) {
                const [x, y] = this.genPos();
                const player = new Player({id, x, y});

                this.entities.push(player);

                console.log("Game joined by " + id);
            } else {
                throw new Error("ID taken");
            }
        } else {
            throw new Error("Game full");
        }
    }

    tick(eve) {
        console.log("Game ticking");

        if(this.running) {
            // Remove dead entities
            this.entities = this.entities.filter(entity => !entity.dead);

            // Remove dynamic bodies
            this.bodies = this.bodies.filter(body => !body.dynamic);

            // Update entities
            this.entities.forEach(entity => {
                const bodies = entity.tick();

                if(isIterable(bodies)) {
                    this.bodies = [...this.bodies, ...bodies];
                }
            });

            // Check for collisions
            for(const entity in this.entities) {
                for(const a in entity.bodies) {
                    for(const b in entity.bodies) {
                        // Outcome of collision
                        console.log({bodies: entity.bodies});

                        if(a.intersects(b)) a.fight(b);
                    }
                }
            }

            eve.emit("tick", this.bodies.map(({x, y}) => ({x, y})));

            setTimeout(this.tick.bind(this, eve), 1000 / +process.env.FPS)
        }
    }

    start(eve) {
        console.log("Game started");

        this.running = true;

        this.bodies = this.genBounds();

        this.entities = [...this.entities, this.genFruit()];

        console.log("Finished loading");

        this.tick(eve);
    }
}

module.exports = Game;