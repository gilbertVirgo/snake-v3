const Body = require("./Body");

class Bounds {
    constructor({width, height}) {
        this.width = width + 2;
        this.height = height + 2;
        this.weight = 3;
    }

    set setWidth(width) { this.width = width }
    set setHeight(height) { this.height = height }
    set setWeight(weight) { this.weight = weight }

    get getWidth() { return this.width }
    get getHeight() { return this.height }
    get getWeight() { return this.weight }

    generate() {
        const bodies = [];
        const vectors = [
            [this.width, -1], 
            [this.width, this.height + 1], 
            [-1, this.height + 1], 
            [-1, -1]
        ];

        let x = -1,
            y = -1;

        for(const [dx, dy] of vectors) {
            while((x !== dx) || (y !== dy)) {
                if(x < dx) x++;
                else if(x > dx) x--;

                if(y < dy) y++;
                else if(y > dy) y--;

                const body = new Body(this, {
                    x, y, 
                    weight: this.weight
                });

                bodies.push(body);
            }
        }

        return bodies;
    }
}

module.exports = Bounds;