var PIXI = window.PIXI

class Renderer {
  constructor () {
    this.stage = new PIXI.Container()
    this.renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true })

    document.getElementById('game').appendChild(this.renderer.view)
  }

  addChild (child) {
    this.stage.addChild(child)
  }

  render () {
    this.renderer.render(this.stage)
  }
}

module.exports = new Renderer()
