(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
/// <reference path="../bin/lib/phaser.d.ts"/>
//import "phaser";
var loadScene_1 = require("./scenes/loadScene");
var menuScene_1 = require("./scenes/menuScene");
//import { GameScene } from "./scenes/gameScene";
var config = {
    title: "RS Clicker",
    version: "0.1",
    width: 256,
    height: 224,
    zoom: 3,
    type: Phaser.AUTO,
    parent: "game",
    scene: [loadScene_1.LoadScene, menuScene_1.MenuScene],
    input: {
        keyboard: true,
        mouse: true,
        touch: false,
        gamepad: false
    },
    backgroundColor: "#000000"
};
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(config) {
        return _super.call(this, config) || this;
    }
    return Game;
}(Phaser.Game));
exports.Game = Game;
window.onload = function () {
    var game = new Game(config);
};

},{"./scenes/loadScene":2,"./scenes/menuScene":3}],2:[function(require,module,exports){
"use strict";
/// <reference path="../../bin/lib/phaser.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var LoadScene = /** @class */ (function (_super) {
    __extends(LoadScene, _super);
    function LoadScene() {
        return _super.call(this, {
            key: "LoadScene"
        }) || this;
    }
    LoadScene.prototype.update = function () {
        console.log("YO STARTING MENU");
        this.scene.start("MenuScene");
    };
    return LoadScene;
}(Phaser.Scene));
exports.LoadScene = LoadScene;

},{}],3:[function(require,module,exports){
"use strict";
/// <reference path="../../bin/lib/phaser.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var MenuScene = /** @class */ (function (_super) {
    __extends(MenuScene, _super);
    function MenuScene() {
        var _this = _super.call(this, {
            key: "MenuScene"
        }) || this;
        _this.bitmapTexts = [];
        return _this;
    }
    MenuScene.prototype.init = function () {
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    };
    MenuScene.prototype.preload = function () {
        this.load.bitmapFont("snakeFont", "./assets/games/snake/snakeFont.png", "./assets/games/snake/snakeFont.fnt");
    };
    MenuScene.prototype.create = function () {
        this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width / 2 - 28, this.sys.canvas.height / 2 - 10, "snakeFont", "S: PLAY", 8));
        this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width / 2 - 70, this.sys.canvas.height / 2 - 60, "snakeFont", "S N A K E", 16));
        this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width / 2 - 45, this.sys.canvas.height / 2 + 30, "snakeFont", "HIGHSCORE: ", 8));
    };
    MenuScene.prototype.update = function () {
        if (this.startKey.isDown) {
            this.scene.start("GameScene");
        }
    };
    return MenuScene;
}(Phaser.Scene));
exports.MenuScene = MenuScene;

},{}]},{},[1]);
