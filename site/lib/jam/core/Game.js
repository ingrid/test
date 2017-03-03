define(["exports", "./Vector", "./Input"], function (exports, _Vector, _Input) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Vector2 = _interopRequireDefault(_Vector);

	var _Input2 = _interopRequireDefault(_Input);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/*	SAMPLE USAGE:
 
 ** hello world game **
 window.onload = function(){
 	var game = jam.Game(640, 480, document.body);
 
 	var hello = jam.Text(320, 240);
 	hello.text = "hello world";
 	hello.color = "rgb(0,0,0)";
 	game.add(hello);
 
 	game.run();
 }
 
 */
	var Game;

	exports.default = Game = function Game(width, height, parentElement) {
		this._canvas = document.createElement("canvas");
		this._canvas.style.position = "relative";
		this._context = this._canvas.getContext("2d");
		this._children = [];
		//jam.Game._canvas = this._canvas;

		// List of objects to be removed
		this._remove = [];

		// Always keep the canvas in the middle of the parent element
		onresize = function () {
			this._canvas.style.left = parentElement.clientWidth / 2 - width / 2 + "px";
			this._canvas.style.top = parentElement.clientHeight / 2 - height / 2 + "px";
		}.bind(this);
		onresize();
		parentElement.onresize = onresize;

		this.width = width;
		this.height = height;
		this.fps = 50; // Frequency
		this.elapsed = 0; // Period
		this.time = 0;
		this.camera = {
			scroll: (0, _Vector2.default)(0, 0),
			size: (0, _Vector2.default)(this.width, this.height),
			follow: null
		};
		this.bgColor = "rgb(255,255,255)";

		// If they didn't supply this argument, assume the doc body
		// as the parent element for the canvas
		if (parentElement === undefined || parentElement === null) {
			parentElement = document.body;
		}
		parentElement.appendChild(this._canvas);

		this._canvas.width = this.width;
		this._canvas.height = this.height;

		this._tick = function () {
			this.update();
			this.render();
			window.setTimeout(this._tick, 1000.0 / this.fps);
		}.bind(this);

		// Called every frame. Most importantly, calls update on each child
		// Additionally, clears out removed elements and updates the camera
		this.update = function () {
			// This filter just says "only leave me if i'm not in the remove list"
			this._children = this._children.filter(function (x, i, a) {
				return this._remove.indexOf(x) === -1;
			}.bind(this));
			this._remove = [];

			this.elapsed = 1.0 / this.fps;
			this.time += this.elapsed;

			// Simplest possible follow code
			if (this.camera.follow !== null) {
				this.camera.scroll.x = this.camera.follow.x - this.width / 2;
				this.camera.scroll.y = this.camera.follow.y - this.height / 2;
			}

			// Call update on each child and pass it the elapsed time
			for (var i = this._children.length - 1; i >= 0; --i) {
				this._children[i].update(this.elapsed);
			}
			// temporarily sticking this here while restructuring.
			_Input2.default._update();
		}.bind(this);

		// Called every frame. Clears the screen then calls render on each child.
		this.render = function () {
			var ctx = this._context;
			ctx.fillStyle = this.bgColor;
			ctx.fillRect(0, 0, this.width, this.height);
			for (var i = this._children.length - 1; i >= 0; --i) {
				this._children[i].render(ctx, this.camera);
			}
		};

		this.add = function (sprite) {
			this._children.push(sprite);
			sprite._game = this;
			this.sortSprites(); // Sort to figure out layering
		};

		this.remove = function (sprite) {
			if (this._remove.indexOf(sprite) === -1) {
				this._remove.push(sprite);
				sprite._game = null;
			}
		};

		this.run = function () {
			this._tick();
		};

		this.sortSprites = function () {
			this._children.sort(function (a, b) {
				return b._layer - a._layer;
			});
		};
	};
});