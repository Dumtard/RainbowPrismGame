class Grid {
    constructor({width, height}) {
        this.width = width;
        this.height = height;
    }

    getGridFromPosition(x, y) {

        return {
            x: Math.floor(x/Grid.LENGTH),
            y: Math.floor(y/Grid.LENGTH)
        }
    }
    
    static get LENGTH() {
        return 50;
    }
}

module.exports = Grid;
