require("dotenv").config();

const rs = require("randomstring");
const rn = require("random-number");

const Player = require("./Player");
const Bounds = require("./Bounds");
const Fruit = require("./Fruit");

const genID = () => rs.generate(10);

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
        if(--this.available > 0) {
            const [x, y] = this.genPos();
            const player = new Player({id, x, y});

            this.entities.push(player);
        }
    }

    tick() {
        if(this.running) {
            // Remove dead entities
            this.entities = this.entities.filter(entity => !entity.dead);

            // Remove dynamic bodies
            this.bodies = this.bodies.filter(body => !body.dynamic);

            // Update entities
            this.entities.forEach(entity => {
                const bodies = entity.tick();
                this.bodies.push(...bodies);
            });

            // Check for collisions
            for(const a in this.bodies) {
                for(const b in this.bodies) {
                    // Outcome of collision
                    if(a.intersects(b)) a.fight(b);
                }
            }

            setTimeout(this.tick, 1000 / +process.env.FPS)
        }
    }

    start() {
        this.running = true;

        this.bodies = this.genBounds();
        this.entities.push(this.genFruit());

        this.tick();
    }
}

module.exports = Game;