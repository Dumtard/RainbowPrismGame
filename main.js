(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true });
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

stage.interactive = true;

let graphics = new PIXI.Graphics();

graphics.lineStyle(20, 0x33FF00);
graphics.moveTo(30, 30);
graphics.lineTo(600, 300);

stage.addChild(graphics);

class Beam {
    constructor() {
        this.x = 30;
        this.y = 30;
    }
}

var count = 0;

var velocity = {
    x: 10,
    y: 10
};

var position = {
    x: 30,
    y: 30
};

var previousTime = Date.now() / 1000;

// run the render loop
animate();

function animate() {
    var currentTime = Date.now() / 1000;

    var delta = currentTime - previousTime;
    previousTime = currentTime;

    graphics.clear();

    position.x += velocity.x * delta;
    position.y += velocity.y * delta;

    graphics.lineStyle(20, 0x33FF00);
    graphics.moveTo(30, 30);
    graphics.lineTo(position.x, position.y);

    //count += 0.1;

    //thing.clear();
    //thing.lineStyle(10, 0xff0000, 1);
    //thing.beginFill(0xffFF00, 0.5);

    //thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count)* 20);
    //thing.lineTo( 120 + Math.cos(count) * 20, -100 + Math.sin(count)* 20);
    //thing.lineTo( 120 + Math.sin(count) * 20, 100 + Math.cos(count)* 20);
    //thing.lineTo( -120 + Math.cos(count)* 20, 100 + Math.sin(count)* 20);
    //thing.lineTo( -120 + Math.sin(count) * 20, -100 + Math.cos(count)* 20);

    //thing.rotation = count * 0.1;
    renderer.render(stage);
    requestAnimationFrame(animate);
}

},{}]},{},[1]);
