class Prism {
    constructor({x, y, type, colour, direction}) {
        this.type = type;
        this.colour = colour;
        this.direction = direction;
        this.position = { x, y };

        this.graphics = new PIXI.Graphics();
        this.graphics.position.set(this.position.x * 50 + 25, this.position.y * 50 + 25);
        this.graphics.width = 50;
        this.graphics.height = 50;
        this.graphics.pivot.set(25, 25);
        this.graphics.beginFill(this.colour, 0.7);
        this.graphics.drawRect(0, 0, 50, 50);
        this.graphics.endFill();

        if (this.type === Prism.TYPE.REFLECT) {
            this.graphics.lineStyle(5, 0x000000, 0.5);
            if (this.direction.x === 0) {
                console.log("E/W: also, direction: " + this.direction);
                this.graphics.moveTo(0, 25);
                this.graphics.lineTo(50, 25);
            } else if (this.direction.y === 0) {
                console.log("N/S: also, direction: " + this.direction);
                this.graphics.moveTo(25, 0);
                this.graphics.lineTo(25, 50);
            } else if (this.direction.x === this.direction.y) {
                console.log("NE/SW: also, direction: " + this.direction);
                this.graphics.moveTo(50, 0);
                this.graphics.lineTo(0, 50);
            } else if (this.direction.x === -1 * this.direction.y) {
                console.log("NW/SE: also, direction: " + this.direction);
                this.graphics.moveTo(0, 0);
                this.graphics.lineTo(50, 50);
            }
        }
        
        if (this.type === Prism.TYPE.REFRACT) {
            this.graphics.lineStyle(5, 0x000000, 0.5);
            this.graphics.moveTo(25,25);
            this.graphics.lineTo(25 + this.direction.x * 25, 25 + this.direction.y * 25);
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
