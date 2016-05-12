let Grid = require('../grid')
let Prism = require('../prism')
let Beam = require('../beam')

class TintPrism extends Prism {
  constructor ({x, y, colour, direction}) {
    super({x, y, colour, direction})
  }

  handle (beam) {
    return [new Beam({
      x: beam.end.x + (beam.direction.x * Grid.LENGTH),
      y: beam.end.y + (beam.direction.y * Grid.LENGTH),
      colour: this.colour,
      direction: beam.direction
    })]
  }
}

module.exports = TintPrism
