let COLOUR = {
  RED: 0xFF0000,
  ORANGE: 0xFFA500,
  YELLOW: 0xFFFF00,
  GREEN: 0x00FF00,
  BLUE: 0x0000FF,
  INDIGO: 0x4B0082,
  VIOLET: 0xEE82EE
}

let DIRECTION = {
  N: { x: 0, y: -1 },
  NE: { x: 1, y: -1 },
  E: { x: 1, y: 0 },
  SE: { x: 1, y: 1 },
  S: { x: 0, y: 1 },
  SW: { x: -1, y: 1 },
  W: { x: -1, y: 0 },
  NW: { x: -1, y: -1 },
  compare: function (obj1, obj2) {
    if (!obj1 || !obj2) {
      return false
    }

    if (obj1.x === obj2.x && obj1.y === obj2.y) {
      return true
    } else {
      return false
    }
  }
}

module.exports = {
  COLOUR,
  DIRECTION
}
