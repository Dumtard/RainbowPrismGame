let Grid = require('./grid')

var PIXI = window.PIXI
var stage = window.stage

class Prism {
  constructor ({x, y, type, colour, direction}) {
    this.type = type
    this.colour = colour
    this.direction = direction
    this.position = { x, y }

    this.graphics = new PIXI.Graphics()
    this.graphics.position.set(this.position.x * Grid.LENGTH + Grid.LENGTH / 2, this.position.y * Grid.LENGTH + Grid.LENGTH / 2)
    this.graphics.width = Grid.LENGTH
    this.graphics.height = Grid.LENGTH
    this.graphics.pivot.set(Grid.LENGTH / 2, Grid.LENGTH / 2)
    this.graphics.beginFill(this.colour, 0.7)
    this.graphics.drawRect(0, 0, Grid.LENGTH, Grid.LENGTH)
    this.graphics.endFill()

    stage.addChild(this.graphics)
  }

  handle (beam) {
    return []
  }

  static get TYPE () {
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

module.exports = Prism
