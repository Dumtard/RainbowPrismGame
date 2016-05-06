var renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true });
document.getElementById('game').appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

class Beam {
    constructor(x, y) {
        this.graphics = new PIXI.Graphics();

        stage.addChild(this.graphics);

        this.direction = {
            x: 1,
            y: 1,
        };

        this.speed = 10;

        this.end = { x, y };
        this.start = { x, y };
    }

    get velocity() {
        return { x: this.direction.x * this.speed, y: this.direction.y * this.speed }
    }

    update(delta) {
        this.graphics.clear();

        this.end.x += this.velocity.x * delta;
        this.end.y += this.velocity.y * delta;

        this.graphics.lineStyle(10, 0x33FF00);
        this.graphics.moveTo(this.start.x, this.start.y);
        this.graphics.lineTo(this.end.x, this.end.y);
    }
}

var previousTime = Date.now() / 1000;

var beams = [];

for (var i = 0; i < 10; i++) {
    beams.push(new Beam(i*50, 30));
}

// run the render loop
animate();

function animate() {
    var currentTime = Date.now() / 1000;

    var delta = currentTime - previousTime;
    previousTime = currentTime;

    for (var i = 0; i < beams.length; i++) {
        beams[i].update(delta);
    }

    renderer.render(stage);
    requestAnimationFrame(animate);
}

