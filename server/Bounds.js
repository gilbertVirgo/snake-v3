const Body = require("./Body");

class Bounds {
    constructor({width, height}) {
        this.width = width + 2;
        this.height = height + 2;
        this.weight = 3;
    }

    generate() {
        const bodies = [];
        const vectors = [
            [this.width + 1, -1], 
            [-1, this.height + 1], 
            [-this.width - 1, -1], 
            [-1, -this.height - 1]
        ];

        let x = 0,
            y = 0;

        for(const [dx, dy] of vectors) {
            while((x !== dx) || (y !== dy)) {
                x += (dx - x) / x;
                y += (dy - y) / y;

                const body = new Body({
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