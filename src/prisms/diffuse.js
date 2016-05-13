let Grid = require('../grid')
let Prism = require('../prism')
let Beam = require('../beam')
let {DIRECTION} = require('../constants')

class DiffusePrism extends Prism {
  constructor ({x, y, colour, direction}) {
    super({x, y, colour, direction})

    // this.graphics.lineStyle(5, 0x000000, 0.5)
    // if (this.direction.x === 0) {
    //   this.graphics.moveTo(0, Grid.LENGTH / 2)
    //   this.graphics.lineTo(Grid.LENGTH, Grid.LENGTH / 2)
    // } else if (this.direction.y === 0) {
    //   this.graphics.moveTo(Grid.LENGTH / 2, 0)
    //   this.graphics.lineTo(Grid.LENGTH / 2, Grid.LENGTH)
    // } else if (this.direction.x === this.direction.y) {
    //   this.graphics.moveTo(Grid.LENGTH, 0)
    //   this.graphics.lineTo(0, Grid.LENGTH)
    // } else if (this.direction.x === -1 * this.direction.y) {
    //   this.graphics.moveTo(0, 0)
    //   this.graphics.lineTo(Grid.LENGTH, Grid.LENGTH)
    // }
  }

  handle (beam) {
    var retValue = super.handle(beam)

    if (retValue) {
      return retValue
    }

    let firstBeamDirection = {x: beam.direction.x, y: beam.direction.y}
    let secondBeamDirection = {x: beam.direction.x, y: beam.direction.y}

    if (DIRECTION.compare(beam.direction, DIRECTION.SE) || DIRECTION.compare(beam.direction, DIRECTION.NW) ||
        DIRECTION.compare(beam.direction, DIRECTION.SW) || DIRECTION.compare(beam.direction, DIRECTION.NE)) {
      firstBeamDirection.x = 0
      secondBeamDirection.y = 0
    } else if (DIRECTION.compare(beam.direction, DIRECTION.S) || DIRECTION.compare(beam.direction, DIRECTION.N) ||
               DIRECTION.compare(beam.direction, DIRECTION.W) || DIRECTION.compare(beam.direction, DIRECTION.E)) {
      firstBeamDirection.x = -beam.direction.y || beam.direction.x
      firstBeamDirection.y = -beam.direction.x || beam.direction.y

      secondBeamDirection.x = beam.direction.x + beam.direction.y
      secondBeamDirection.y = beam.direction.x + beam.direction.y
    }

    return [new Beam({
      x: (firstBeamDirection.x * Grid.LENGTH / 2) + (this.position.x * Grid.LENGTH) + Grid.LENGTH / 2,
      y: (firstBeamDirection.y * Grid.LENGTH / 2) + (this.position.y * Grid.LENGTH) + Grid.LENGTH / 2,
      colour: beam.colour,
      direction: firstBeamDirection
    }), new Beam({
      x: (secondBeamDirection.x * Grid.LENGTH / 2) + (this.position.x * Grid.LENGTH) + Grid.LENGTH / 2,
      y: (secondBeamDirection.y * Grid.LENGTH / 2) + (this.position.y * Grid.LENGTH) + Grid.LENGTH / 2,
      colour: beam.colour,
      direction: secondBeamDirection
    })]
  }
}

module.exports = DiffusePrism
