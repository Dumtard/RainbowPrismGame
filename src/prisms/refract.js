let Grid = require('../grid')
let Prism = require('../prism')
let Beam = require('../beam')

class RefractPrism extends Prism {
  constructor ({x, y, colour, direction}) {
    super({x, y, colour, direction})

    this.graphics.lineStyle(5, 0x000000, 0.5)
    this.graphics.moveTo(Grid.LENGTH / 2, Grid.LENGTH / 2)
    this.graphics.lineTo(Grid.LENGTH / 2 + this.direction.x * Grid.LENGTH / 2, Grid.LENGTH / 2 + this.direction.y * Grid.LENGTH / 2)
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

    return [new Beam({
      x: this.position.x * Grid.LENGTH + Grid.LENGTH / 2 + (this.direction.x * Grid.LENGTH / 2),
      y: this.position.y * Grid.LENGTH + Grid.LENGTH / 2 + (this.direction.y * Grid.LENGTH / 2),
      colour: beam.colour,
      direction: this.direction
    })]
  }
}

module.exports = RefractPrism
