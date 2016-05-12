let Grid = require('./grid');
let Beam = require('./beam');
let Prism = require('./prism');

let grid = new Grid({width: 800, height: 600});

let {DIRECTION, COLOUR} = require('./constants');

class SceneManager {
    constructor() {
        this.beams = [];
        this.prisms = [];
        this.occupied = [];
    }

    get add() {
        return {
            beam: (obj) => {
                this.beams.push(obj);
            },
            prism: (obj) => {
                this.prisms.push(obj);

                this.occupied[obj.position.x] = this.occupied[obj.position.x] || [];
                this.occupied[obj.position.x][obj.position.y] = obj;
            }
        }
    }

    update(delta) {
        for (let beam of this.beams) {
            beam.update(delta);

            let position = grid.getGridFromPosition(beam.end.x, beam.end.y);
            if (typeof this.occupied[position.x] != 'undefined' && this.occupied[position.x][position.y] && beam.speed > 0) {
                beam.speed = 0;
                let activatedPrism = this.occupied[position.x][position.y];
                var newBeams = activatedPrism.handle(beam);
                for (let newBeam of newBeams) {
                    this.add.beam(newBeam);
                }
            }
        }
    }
}

module.exports = SceneManager;
