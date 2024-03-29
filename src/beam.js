var renderer = require('./renderer')

var PIXI = window.PIXI

class Beam {
  constructor ({x, y, colour, direction}) {
    this.graphics = new PIXI.Graphics()

    renderer.addChild(this.graphics)

    this.direction = direction

    this.speed = 200

    this.end = { x, y }
    this.start = { x, y }

    this.colour = colour
  }

  get velocity () {
    return { x: this.direction.x * this.speed, y: this.direction.y * this.speed }
  }

  update (delta) {
    this.graphics.clear()

    this.end.x += this.velocity.x * delta
    this.end.y += this.velocity.y * delta

    this.graphics.lineStyle(5, this.colour, 0.5)
    this.graphics.moveTo(this.start.x, this.start.y)
    this.graphics.lineTo(this.end.x, this.end.y)
  }
}

module.exports = Beam
