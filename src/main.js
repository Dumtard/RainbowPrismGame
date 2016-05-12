require('babel-polyfill')

var PIXI = window.PIXI

// TODO Don't make this a global
var stage = new PIXI.Container()
window.stage = stage

let Beam = require('./beam')
let TintPrism = require('./prisms/tint')
let ReflectPrism = require('./prisms/reflect')
let RefractPrism = require('./prisms/refract')
let SceneManager = require('./scene-manager')
let {DIRECTION, COLOUR} = require('./constants')

var requestAnimationFrame = window.requestAnimationFrame

var renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true })
document.getElementById('game').appendChild(renderer.view)

var previousTime = Date.now() / 1000

var sceneManager = new SceneManager()

// TINT test
// sceneManager.add.beam(new Beam({ x: 0, y: 175, colour: COLOUR.VIOLET, direction: DIRECTION.E }))
// sceneManager.add.beam(new Beam({ x: 300, y: 250, colour: COLOUR.GREEN, direction: DIRECTION.NW }))
// sceneManager.add.beam(new Beam({ x: 300, y: 175, colour: COLOUR.YELLOW, direction: DIRECTION.W }))

sceneManager.add.prism(new TintPrism({ x: 6, y: 5, colour: COLOUR.GREEN, direction: DIRECTION.N }))
// sceneManager.add.prism(new Prism({ x: 4, y: 3, type: Prism.TYPE.TINT, colour: COLOUR.ORANGE, direction: DIRECTION.W }))
// sceneManager.add.prism(new Prism({ x: 3, y: 3, type: Prism.TYPE.TINT, colour: COLOUR.RED, direction: DIRECTION.W }))

// sceneManager.add.prism(new Prism({ x: 7, y: 3, type: Prism.TYPE.TINT, colour: COLOUR.ORANGE, direction: DIRECTION.W }))

// REFLECT test
sceneManager.add.prism(new ReflectPrism({ x: 4, y: 3, colour: COLOUR.GREEN, direction: DIRECTION.N }))

// REFRACT test
sceneManager.add.beam(new Beam({ x: 300, y: 375, colour: COLOUR.RED, direction: DIRECTION.E }))
sceneManager.add.prism(new RefractPrism({ x: 8, y: 7, colour: COLOUR.RED, direction: DIRECTION.NW }))

// Multiple colour line test
var fragmentShader = [
  'precision mediump float;',
  '',
  'varying vec2 vTextureCoord;',
  'uniform sampler2D uSampler;',
  'uniform float delta;',
  '',
  'void main(void)',
  '{',
  '    vec4 pixel = texture2D(uSampler, vTextureCoord);',
  '    if (pixel.r > 0.1 || pixel.g > 0.1 || pixel.b > 0.1)',
  '    {',
  '        float wave = sin(3.0 * delta);',
  '        gl_FragColor = mix(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0), wave);',
  '    }',
  '   else',
  '   {',
  '       gl_FragColor = pixel;',
  '   }',
  '}'
].join('\n')

var graphics = new PIXI.Graphics()

graphics.lineStyle(5, 0xffd900, 1)

// draw a shape
graphics.moveTo(50, 50)
graphics.lineTo(250, 50)

stage.addChild(graphics)

// Adapted from http://blog.cjgammon.com/custom-filters-with-pixi-js-using-glsl-shaders
function ColourFilter (fragmentSource) {
  PIXI.AbstractFilter.call(this, null, fragmentShader, {delta: {type: 'f', value: 0}})
}

ColourFilter.prototype = Object.create(PIXI.AbstractFilter.prototype)
ColourFilter.prototype.constructor = ColourFilter

var filter = new ColourFilter()
graphics.filters = [filter]

// run the render loop
animate()

function animate () {
  var currentTime = Date.now() / 1000

  var delta = currentTime - previousTime
  previousTime = currentTime

  filter.uniforms.delta.value += delta

  filter.uniforms.delta.value += delta

  sceneManager.update(delta)

  renderer.render(stage)
  requestAnimationFrame(animate)
}

