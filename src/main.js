require('babel-polyfill');

let Beam = require('./beam');
let Prism = require('./prism');
let SceneManager = require('./scene-manager');
let {DIRECTION, COLOUR} = require('./constants');

//TODO Don't make this a global
window.stage = new PIXI.Container();

var renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true });
document.getElementById('game').appendChild(renderer.view);

var previousTime = Date.now() / 1000;

var sceneManager = new SceneManager();

//TINT test
sceneManager.add.beam(new Beam({ x: 0, y: 175, colour: COLOUR.VIOLET, direction: DIRECTION.E }));
sceneManager.add.beam(new Beam({ x: 300, y: 250, colour: COLOUR.GREEN, direction: DIRECTION.NW }));
sceneManager.add.beam(new Beam({ x: 300, y: 175, colour: COLOUR.YELLOW, direction: DIRECTION.W }));
sceneManager.add.prism(new Prism({ x: 3, y: 3, type: Prism.TYPE.TINT, colour: COLOUR.RED, direction: DIRECTION.W }));
sceneManager.add.prism(new Prism({ x: 4, y: 3, type: Prism.TYPE.TINT, colour: COLOUR.ORANGE, direction: DIRECTION.W }));

//REFLECT test
sceneManager.add.prism(new Prism({ x: 8, y: 3, type: Prism.TYPE.REFLECT, colour: COLOUR.ORANGE, direction: DIRECTION.NW }));


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

