require('babel-polyfill');

let Beam = require('./Beam');
let Prism = require('./Prism');
let SceneManager = require('./SceneManager');
let {DIRECTION, COLOUR} = require('./Constants');

//TODO Don't make this a global
window.stage = new PIXI.Container();

var renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true });
document.getElementById('game').appendChild(renderer.view);

var previousTime = Date.now() / 1000;

var sceneManager = new SceneManager();

sceneManager.add(Beam, { x: 0, y: 175, colour: COLOUR.VIOLET, direction: DIRECTION.E });
sceneManager.add(Beam, { x: 300, y: 250, colour: COLOUR.GREEN, direction: DIRECTION.NW });
sceneManager.add(Beam, { x: 300, y: 175, colour: COLOUR.YELLOW, direction: DIRECTION.W });
sceneManager.add(Prism, { x: 3, y: 3, type: Prism.TYPE.TINT, colour: COLOUR.RED, direction: DIRECTION.W });
sceneManager.add(Prism, { x: 4, y: 3, type: Prism.TYPE.TINT, colour: COLOUR.ORANGE, direction: DIRECTION.W });

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

