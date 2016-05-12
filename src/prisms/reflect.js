let Grid = require('../grid')
let Prism = require('../prism')
let Beam = require('../beam')
let {DIRECTION} = require('../constants')

class ReflectPrism extends Prism {
  constructor ({x, y, colour, direction}) {
    super({x, y, colour, direction})

    this.graphics.lineStyle(5, 0x000000, 0.5)
    if (this.direction.x === 0) {
      this.graphics.moveTo(0, Grid.LENGTH / 2)
      this.graphics.lineTo(Grid.LENGTH, Grid.LENGTH / 2)
    } else if (this.direction.y === 0) {
      this.graphics.moveTo(Grid.LENGTH / 2, 0)
      this.graphics.lineTo(Grid.LENGTH / 2, Grid.LENGTH)
    } else if (this.direction.x === this.direction.y) {
      this.graphics.moveTo(Grid.LENGTH, 0)
      this.graphics.lineTo(0, Grid.LENGTH)
    } else if (this.direction.x === -1 * this.direction.y) {
      this.graphics.moveTo(0, 0)
      this.graphics.lineTo(Grid.LENGTH, Grid.LENGTH)
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

    let newBeamDirection = {x: beam.direction.x, y: beam.direction.y}
    if ((this.direction === DIRECTION.N || this.direction === DIRECTION.S) && beam.direction.y !== 0) {
      newBeamDirection.y = beam.direction.y * -1
    } else if ((this.direction === DIRECTION.E || this.direction === DIRECTION.W) && beam.direction.x !== 0) {
      newBeamDirection.x = beam.direction.x * -1
    } else if ((this.direction === DIRECTION.NE || this.direction === DIRECTION.SW) && beam.direction.x !== -1 * beam.direction.y) {
      newBeamDirection.x = beam.direction.y
      newBeamDirection.y = beam.direction.x
    } else if ((this.direction === DIRECTION.NW || this.direction === DIRECTION.SE) && beam.direction.x !== beam.direction.y) {
      newBeamDirection.x = beam.direction.y * -1
      newBeamDirection.y = beam.direction.x * -1
    } else {
      return []
    }

    return [new Beam({
      x: (newBeamDirection.x * Grid.LENGTH / 2) + (this.position.x * Grid.LENGTH) + Grid.LENGTH / 2,
      y: (newBeamDirection.y * Grid.LENGTH / 2) + (this.position.y * Grid.LENGTH) + Grid.LENGTH / 2,
      colour: beam.colour,
      direction: newBeamDirection
    })]
  }
}

module.exports = ReflectPrism
