require('babel-polyfill')

var Game = require('./game')

var game = new Game()
game.update()

// Multiple colour line test
// var fragmentShader = [
//   'precision mediump float;',
//   '',
//   'varying vec2 vTextureCoord;',
//   'uniform sampler2D uSampler;',
//   'uniform float delta;',
//   '',
//   'void main(void)',
//   '{',
//   '    vec4 pixel = texture2D(uSampler, vTextureCoord);',
//   '    if (pixel.r > 0.1 || pixel.g > 0.1 || pixel.b > 0.1)',
//   '    {',
//   '        float wave = sin(3.0 * delta);',
//   '        gl_FragColor = mix(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0), wave);',
//   '    }',
//   '   else',
//   '   {',
//   '       gl_FragColor = pixel;',
//   '   }',
//   '}'
// ].join('\n')

// var graphics = new PIXI.Graphics()

// graphics.lineStyle(5, 0xffd900, 1)

// draw a shape
// graphics.moveTo(50, 50)
// graphics.lineTo(250, 50)

// stage.addChild(graphics)

// Adapted from http://blog.cjgammon.com/custom-filters-with-pixi-js-using-glsl-shaders
// function ColourFilter (fragmentSource) {
//   PIXI.AbstractFilter.call(this, null, fragmentShader, {delta: {type: 'f', value: 0}})
// }

// ColourFilter.prototype = Object.create(PIXI.AbstractFilter.prototype)
// ColourFilter.prototype.constructor = ColourFilter

// var filter = new ColourFilter()
// graphics.filters = [filter]

