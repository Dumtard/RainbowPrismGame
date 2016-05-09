let Screen = require('./screen');
let Beam = require('./beam');
let Prism = require('./prism');

let screen = new Screen({width: 800, height: 600, gridLength: 50});

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

            let position = screen.getGridFromPosition(beam.end.x, beam.end.y);
            if (typeof this.occupied[position.x] != 'undefined' && this.occupied[position.x][position.y] && beam.speed > 0) {
                beam.speed = 0;

                let activatedPrism = this.occupied[position.x][position.y];
                if (activatedPrism.type === Prism.TYPE.TINT) {
                    this.add.beam(new Beam({
                        x: beam.end.x + (beam.direction.x * 50),
                        y: beam.end.y + (beam.direction.y * 50),
                        colour: activatedPrism.colour,
                        direction: beam.direction
                    }));
                }
            }
        }
        for (let prism of this.prisms) {
            prism.update(delta);
        }
    }
}

module.exports = SceneManager;
