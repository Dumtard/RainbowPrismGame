let Grid = require('./grid')

let grid = new Grid({width: 800, height: 600})

class SceneManager {
  constructor () {
    this.beams = []
    this.prisms = []
    this.occupied = []
  }

  get add () {
    return {
      beam: (obj) => {
        this.beams.push(obj)
      },
      prism: (obj) => {
        this.prisms.push(obj)

        this.occupied[obj.position.x] = this.occupied[obj.position.x] || []
        this.occupied[obj.position.x][obj.position.y] = obj
      }
    }
  }

  update (delta) {
    for (let beam of this.beams) {
      beam.update(delta)

      let position = grid.getGridFromPosition(beam.end.x, beam.end.y)
      if (typeof this.occupied[position.x] !== 'undefined' && this.occupied[position.x][position.y] && beam.speed > 0) {
        let activatedPrism = this.occupied[position.x][position.y]

        beam.speed = 0

        beam.end.x = Math.round(beam.end.x / (Grid.LENGTH / 2)) * Grid.LENGTH / 2
        beam.end.y = Math.round(beam.end.y / (Grid.LENGTH / 2)) * Grid.LENGTH / 2

        var newBeams = activatedPrism.handle(beam)
        for (let newBeam of newBeams) {
          setTimeout(() => {
            this.add.beam(newBeam)
          }, (40 * Math.pow(25, 2)) / newBeam.speed)
        }
      }
    }
  }
}

module.exports = SceneManager
