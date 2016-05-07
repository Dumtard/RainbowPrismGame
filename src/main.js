require('babel-polyfill');

class Screen {
    constructor(width, height, gridLength) {
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

var screen = new Screen(800, 600, 50);

var renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true });
document.getElementById('game').appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

class Beam {
    constructor(x, y, colour, orientation) {
        this.graphics = new PIXI.Graphics();

        stage.addChild(this.graphics);

        this.direction = orientation;

        this.speed = 50;

        this.end = { x, y };
        this.start = { x, y };

        this.colour = colour;
    }

    get velocity() {
        return { x: this.direction.x * this.speed, y: this.direction.y * this.speed }
    }

    update(delta) {
        this.graphics.clear();

        this.end.x += this.velocity.x * delta;
        this.end.y += this.velocity.y * delta;

        this.graphics.lineStyle(10, this.colour, 0.5);
        this.graphics.moveTo(this.start.x, this.start.y);
        this.graphics.lineTo(this.end.x, this.end.y);
    }
}

var COLOUR = {
    red: 0xFF0000,
    orange: 0xFFA500,
    yellow: 0xFFFF00,
    green: 0x00FF00,
    blue: 0x0000FF,
    indigo: 0x4B0082,
    violet: 0xEE82EE
}

var ORIENTATION = {
    N: { x: 0, y: -1 },
    NE: { x: 1, y: -1 },
    E: { x: 1, y: 0 },
    SE: { x: 1, y: 1 },
    S: { x: 0, y: 1 },
    SW: { x: -1, y: 1 },
    W: { x: -1, y: 0 },
    NW: { x: -1, y: -1 },
}

var PRISM_TYPE = {
  reflect: 1,
  refract: 1,
  diffuse: 1,
  add: 1,
  subtract: 1,
  evolve: 1,
  tint: 1,
}

class Prism {
    constructor(type, colour, orientation, x, y) {
        this.type = type;
        this.colour = colour;
        this.orientation = orientation;
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

class SceneManager {
    constructor() {
        this.beams = [];
        this.prisms = [];
        this.occupied = [];
    }
    
    pushBeam(beam) {
        this.beams.push(beam)
    }

    pushPrism(prism) {
        this.prisms.push(prism);
        this.occupied[prism.position.x] = this.occupied[prism.position.x] || [];
        this.occupied[prism.position.x][prism.position.y] = prism;
    }

    update(delta) {
        for (let beam of this.beams) {
            beam.update(delta);
            let position = screen.getGridFromPosition(beam.end.x, beam.end.y);
            if (typeof this.occupied[position.x] != 'undefined' && this.occupied[position.x][position.y] && beam.speed > 0) {
            	beam.speed = 0;

            	let activatedPrism = this.occupied[position.x][position.y];
            	if (activatedPrism.type === PRISM_TYPE.tint) {
            		let newBeam = new Beam(beam.end.x + (beam.direction.x * 50), beam.end.y + (beam.direction.y * 50), activatedPrism.colour, beam.direction);
            		this.pushBeam(newBeam);
            	}
            }
        }
        for (let prism of this.prisms) {
            prism.update(delta);
        }
    }
}

var previousTime = Date.now() / 1000;

var sceneManager = new SceneManager();

sceneManager.pushBeam(new Beam(0, 175, COLOUR.violet, ORIENTATION.E));
sceneManager.pushBeam(new Beam(300, 250, COLOUR.green, ORIENTATION.NW));
sceneManager.pushBeam(new Beam(550, 175, COLOUR.yellow, ORIENTATION.W));
sceneManager.pushPrism(new Prism(PRISM_TYPE.tint, COLOUR.red, ORIENTATION.N, 3, 3));
sceneManager.pushPrism(new Prism(PRISM_TYPE.tint, COLOUR.orange, ORIENTATION.N, 4, 3));

// run the render loop
animate();

function animate() {
    var currentTime = Date.now() / 1000;

    var delta = currentTime - previousTime;
    previousTime = currentTime;

    sceneManager.update(delta);

    renderer.render(stage);
    requestAnimationFrame(animate);
}

