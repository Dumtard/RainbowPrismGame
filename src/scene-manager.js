let Screen = require('./screen');
let Beam = require('./beam');
let Prism = require('./prism');

let screen = new Screen({width: 800, height: 600, gridLength: 50});

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
                //REFLECT Logic
                } else if (activatedPrism.type === Prism.TYPE.REFLECT && activatedPrism.colour === beam.colour) {
                    let newBeamDirection = {x: beam.direction.x, y: beam.direction.y};
                    if ((activatedPrism.direction === DIRECTION.N || activatedPrism.direction === DIRECTION.S) && beam.direction.y !== 0) {
                        newBeamDirection.y = beam.direction.y * -1;
                    } else if ((activatedPrism.direction === DIRECTION.E || activatedPrism.direction === DIRECTION.W) && beam.direction.x !== 0) {
                        newBeamDirection.x = beam.direction.x * -1;
                    } else if ((activatedPrism.direction === DIRECTION.NE || activatedPrism.direction === DIRECTION.SW) && beam.direction.x !== -1 * beam.direction.y) {
                        newBeamDirection.x = beam.direction.y;
                        newBeamDirection.y = beam.direction.x;
                    } else if ((activatedPrism.direction === DIRECTION.NW || activatedPrism.direction === DIRECTION.SE) && beam.direction.x !== beam.direction.y) {
                        newBeamDirection.x = beam.direction.y * -1;
                        newBeamDirection.y = beam.direction.x * -1;
                    } else { 
                        continue; 
                    }
                    this.add.beam(new Beam({
                        x: (newBeamDirection.x * 25  ) + (position.x * 50) + 25,
                        y: (newBeamDirection.y * 25  ) + (position.y * 50) + 25,
                        colour: beam.colour,
                        direction: newBeamDirection,
                    }));
                } else { 
                    this.add.beam(new Beam({
                        x: beam.end.x + (beam.direction.x * 50),
                        y: beam.end.y + (beam.direction.y * 50),
                        colour: beam.colour,
                        direction: beam.direction
                    }));
                };
            }
        }
        for (let prism of this.prisms) {
            prism.update(delta);
        }
    }
}

module.exports = SceneManager;
