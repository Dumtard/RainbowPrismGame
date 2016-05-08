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
        stage.addChild(this.graphics);
    }

    update(delta) {
    }
}

module.exports = Prism;
