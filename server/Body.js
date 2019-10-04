class Body {
    constructor(owner, {x, y, weight, dynamic = false}) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.weight = weight;
        this.dynamic = dynamic; // if dynamic, die after one tick
    }

    intersects(body) {
        let x = this.x === body.x, 
            y = this.y === body.y;

        return x && y;
    }

    fight(body) {
        if(!this.owner.dead && !body.owner.dead) {
            if(this.weight > body.weight) {
                body.owner.die();
            } else if(this.weight === body.weight) {
                this.owner.die();
                body.owner.die();
            } else {
                this.owner.die();
            }
        }
    }
}

module.exports = Body;