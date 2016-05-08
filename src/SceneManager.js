let Screen = require('./Screen');
let Beam = require('./Beam');
let {PRISM_TYPE} = require('./Constants');

let screen = new Screen({width: 800, height: 600, gridLength: 50});

class SceneManager {
    constructor() {
        this.beams = [];
        this.prisms = [];
        this.occupied = [];
    }

    add(Class, params) {
        var object = new Class(params);
        this[Class.name.toLowerCase() + 's'].push(object);

        if (Class.name === 'Prism') {
            this.occupied[object.position.x] = this.occupied[object.position.x] || [];
            this.occupied[object.position.x][object.position.y] = object;
        }
    }

    update(delta) {
        for (let beam of this.beams) {
            beam.update(delta);

            let position = screen.getGridFromPosition(beam.end.x, beam.end.y);
            if (typeof this.occupied[position.x] != 'undefined' && this.occupied[position.x][position.y] && beam.speed > 0) {
                beam.speed = 0;

                let activatedPrism = this.occupied[position.x][position.y];
                if (activatedPrism.type === PRISM_TYPE.TINT) {
                    this.add(Beam, {
                        x: beam.end.x + (beam.direction.x * 50),
                        y: beam.end.y + (beam.direction.y * 50),
                        colour: activatedPrism.colour,
                        direction: beam.direction
                    });
                }
            }
        }
        for (let prism of this.prisms) {
            prism.update(delta);
        }
    }
}

module.exports = SceneManager;
