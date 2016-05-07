require('babel-polyfill');

let Beam = require('./Beam');
let Prism = require('./Prism');
let SceneManager = require('./SceneManager');
let {PRISM_TYPE, DIRECTION, COLOUR} = require('./Constants');

//TODO Don't make this a global
window.stage = new PIXI.Container();

var renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true });
document.getElementById('game').appendChild(renderer.view);

var previousTime = Date.now() / 1000;

var sceneManager = new SceneManager();

sceneManager.pushBeam(new Beam(0, 175, COLOUR.VIOLET, DIRECTION.E));
sceneManager.pushBeam(new Beam(300, 250, COLOUR.GREEN, DIRECTION.NW));
sceneManager.pushBeam(new Beam(550, 175, COLOUR.YELLOW, DIRECTION.W));
sceneManager.pushPrism(new Prism(PRISM_TYPE.TINT, COLOUR.RED, DIRECTION.N, 3, 3));
sceneManager.pushPrism(new Prism(PRISM_TYPE.TINT, COLOUR.ORANGE, DIRECTION.N, 4, 3));

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

