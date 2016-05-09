class Screen {
    constructor({width, height, gridLength}) {
        this.width = width;
        this.height = height;
        this.gridLength = gridLength;
    }

    getGridFromPosition(x, y) {

        return {
            x: Math.floor(x/this.gridLength),
            y: Math.floor(y/this.gridLength)
        }
    }
}

module.exports = Screen;
