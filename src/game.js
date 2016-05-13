let Beam = require('./beam')
let TintPrism = require('./prisms/tint')
let ReflectPrism = require('./prisms/reflect')
let RefractPrism = require('./prisms/refract')
let SceneManager = require('./scene-manager')
let {DIRECTION, COLOUR} = require('./constants')
let renderer = require('./renderer')

var sceneManager = new SceneManager()

var requestAnimationFrame = window.requestAnimationFrame

class Game {
  constructor () {
    this.previousTime = Date.now() / 1000
    this.delta = 0

    this.setupScene()
  }

  setupScene () {
    sceneManager.add.prism(new TintPrism({ x: 6, y: 5, colour: COLOUR.GREEN, direction: DIRECTION.N }))
    sceneManager.add.prism(new ReflectPrism({ x: 4, y: 3, colour: COLOUR.GREEN, direction: DIRECTION.N }))
    sceneManager.add.beam(new Beam({ x: 300, y: 375, colour: COLOUR.RED, direction: DIRECTION.E }))
    sceneManager.add.prism(new RefractPrism({ x: 8, y: 7, colour: COLOUR.RED, direction: DIRECTION.NW }))
  }

  update () {
    var currentTime = Date.now() / 1000

    this.delta = currentTime - this.previousTime
    this.previousTime = currentTime

    sceneManager.update(this.delta)

    renderer.render()

    requestAnimationFrame(this.update.bind(this))
  }
}

module.exports = Game
