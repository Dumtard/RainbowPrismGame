let Screen = require('./Screen');
let Beam = require('./Beam');
let {PRISM_TYPE} = require('./Constants');

let screen = new Screen(800, 600, 50);

class SceneManager {
    constructor() {
        this.beams = [];
        this.prisms = [];
        this.occupied = [];
    }

    pushBeam(beam) {
        this.beams.push(beam)
    }

    pushPrism(prism) {
        this.prisms.push(prism);
        this.occupied[prism.position.x] = this.occupied[prism.position.x] || [];
        this.occupied[prism.position.x][prism.position.y] = prism;
    }

    update(delta) {
        for (let beam of this.beams) {
            beam.update(delta);
            let position = screen.getGridFromPosition(beam.end.x, beam.end.y);
            if (typeof this.occupied[position.x] != 'undefined' && this.occupied[position.x][position.y] && beam.speed > 0) {
                beam.speed = 0;

                let activatedPrism = this.occupied[position.x][position.y];
                if (activatedPrism.type === PRISM_TYPE.TINT) {
                    let newBeam = new Beam(beam.end.x + (beam.direction.x * 50), beam.end.y + (beam.direction.y * 50), activatedPrism.colour, beam.direction);
                    this.pushBeam(newBeam);
                }
            }
        }
        for (let prism of this.prisms) {
            prism.update(delta);
        }
    }
}

module.exports = SceneManager;
