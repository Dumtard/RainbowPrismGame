class Prism {
    constructor({x, y, type, colour, direction}) {
        this.type = type;
        this.colour = colour;
        this.direction = direction;
        this.position = { x, y };

        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(this.colour, 0.7);
        this.graphics.drawRect(this.position.x * 50, this.position.y * 50, 50, 50);
        this.graphics.endFill();

        if (this.type === Prism.TYPE.REFLECT) {
            this.graphics.lineStyle(5, 0x000000, 0.5);
            if (this.direction.x === 0) {
                console.log("E/W: also, direction: " + this.direction);
                this.graphics.moveTo(this.position.x * 50, this.position.y * 50 + 25);
                this.graphics.lineTo(this.position.x * 50 + 50, this.position.y * 50 + 25);
            } else if (this.direction.y === 0) {
                console.log("N/S: also, direction: " + this.direction);
                this.graphics.moveTo(this.position.x * 50 + 25, this.position.y * 50);
                this.graphics.lineTo(this.position.x * 50 + 25, this.position.y * 50 + 50);
            } else if (this.direction.x === this.direction.y) {
                console.log("NE/SW: also, direction: " + this.direction);
                this.graphics.moveTo(this.position.x * 50 + 50, this.position.y * 50);
                this.graphics.lineTo(this.position.x * 50, this.position.y * 50 + 50);
            } else if (this.direction.x === -1 * this.direction.y) {
                console.log("NW/SE: also, direction: " + this.direction);
                this.graphics.moveTo(this.position.x * 50, this.position.y * 50);
                this.graphics.lineTo(this.position.x * 50 + 50, this.position.y * 50 + 50);
            }
        }
        stage.addChild(this.graphics);
    }

    update(delta) {
    }

    static get TYPE() {
        return {
            REFLECT: 0,
            REFRACT: 1,
            DIFFUSE: 2,
            ADD: 3,
            SUBTRACT: 4,
            EVOLVE: 5,
            TINT: 6
        }
    }
}

module.exports = Prism;
