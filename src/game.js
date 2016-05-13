let Beam = require('./beam')
let TintPrism = require('./prisms/tint')
let ReflectPrism = require('./prisms/reflect')
let RefractPrism = require('./prisms/refract')
let DiffusePrism = require('./prisms/diffuse')
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
    sceneManager.add.beam(new Beam({ x: 300, y: 375, colour: COLOUR.VIOLET, direction: DIRECTION.E }))

    sceneManager.add.prism(new TintPrism({ x: 6, y: 5, colour: COLOUR.GREEN, direction: DIRECTION.N }))
    sceneManager.add.prism(new TintPrism({ x: 10, y: 3, colour: COLOUR.BLUE, direction: DIRECTION.N }))
    sceneManager.add.prism(new DiffusePrism({ x: 4, y: 3, colour: COLOUR.BLUE, direction: DIRECTION.N }))
    sceneManager.add.prism(new DiffusePrism({ x: 8, y: 7, colour: COLOUR.VIOLET, direction: DIRECTION.NW }))
    sceneManager.add.prism(new DiffusePrism({ x: 10, y: 5, colour: COLOUR.VIOLET, direction: DIRECTION.W }))
    sceneManager.add.prism(new ReflectPrism({ x: 10, y: 9, colour: COLOUR.VIOLET, direction: DIRECTION.N }))
    sceneManager.add.prism(new DiffusePrism({ x: 12, y: 7, colour: COLOUR.VIOLET, direction: DIRECTION.S }))
    sceneManager.add.prism(new TintPrism({ x: 12, y: 5, colour: COLOUR.GREEN, direction: DIRECTION.SW }))
    sceneManager.add.prism(new ReflectPrism({ x: 12, y: 3, colour: COLOUR.GREEN, direction: DIRECTION.SW }))
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
