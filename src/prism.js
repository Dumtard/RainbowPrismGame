let Grid = require('./grid')
let Beam = require('./beam')
let renderer = require('./renderer')

var PIXI = window.PIXI

class Prism {
  constructor ({x, y, type, colour, direction}) {
    this.type = type
    this.colour = colour
    this.direction = direction
    this.x = x
    this.y = y

    this.graphics = new PIXI.Graphics()
    this.graphics.position.set(this.position.x * Grid.LENGTH + Grid.LENGTH / 2, this.position.y * Grid.LENGTH + Grid.LENGTH / 2)
    this.graphics.width = Grid.LENGTH
    this.graphics.height = Grid.LENGTH
    this.graphics.pivot.set(Grid.LENGTH / 2, Grid.LENGTH / 2)
    this.graphics.beginFill(this.colour, 0.7)
    this.graphics.drawRect(0, 0, Grid.LENGTH, Grid.LENGTH)
    this.graphics.endFill()

    renderer.addChild(this.graphics)
  }

  get position () {
    return {
      x: this.x,
      y: this.y
    }
  }

  handle (beam) {
    if (this.colour !== beam.colour) {
      return [new Beam({
        x: beam.end.x + (beam.direction.x * Grid.LENGTH),
        y: beam.end.y + (beam.direction.y * Grid.LENGTH),
        colour: beam.colour,
        direction: beam.direction
      })]
    }
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
