/* **************************************************************************** */
/* 														 ____   _    ___  	  	*/
/* 	 editor.js											|  _ \ / \  ( _ ) 		*/
/* 														| |_) / _ \ / _ \ 		*/
/* 	 By: 												|  __/ ___ | (_) |		*/
/* 														|_| /_/   \_\___/ 		*/
/*   Created: 2016/02/01 by Pr0lexic											*/
/* 	 Updated: 2016/02/01 by Pr0lexic											*/
/*                  															*/
/* **************************************************************************** */

Community.Editor = function(game) {

	/**
	 * 2D array containing the current edited map
	 * @type {Array}
	 */
	this.map = null;

	/**
	 * Definition of the dimension of the grid
	 * @type {Number}
	 */
	this.MINIMUM_WIDTH = 20;
	this.MINIMUM_HEIGHT = 10;
	this.MAXIMUM_WIDTH = 100;
	this.MAXIMUM_HEIGHT = 40;

	/**
	 * Width of the map i.e number of horizontal tiles - default 20 tiles
	 * @type {Number}
	 */
	this.mapWidth = this.MINIMUM_WIDTH;

	/**
	 * Height of the map i.e number of vertical tiles - default 10 tiles
	 * @type {Number}
	 */
	this.mapHeight = this.MINIMUM_HEIGHT;

	/**
	 * Décallage horizontal de la map par rapport au canvas
	 * @type {Number}
	 */
	this.scrollX = 0;

	/**
	 * Décallage vertical de la map par rapport au canvas
	 * @type {Number}
	 */
	this.scrollY = 0;

	/**
	 * Width of a tile - default 32px
	 * @type {Number}
	 */
	this.tileWidth = 32;

	/**
	 * Height of a tile - default 32px
	 * @type {Number}
	 */
	this.tileHeight = 32;

	/**
	 * Canvas representing the screen of the editor
	 * @type {Phaser.Canvas}
	 */
	this.canvasEditor = null;

	/**
	 * Canvas representing the background of the editor grid
	 * @type {Phaser.Canvas}
	 */
	this.canvasBackground = null;

	/**
	 * Canvas of the grid of the editor
	 * @type {Phaser.Canvas}
	 */
	this.canvasGrid = null;

	/**
	 * Canvas of the tiles palette (i.e list of all available tiles)
	 * @type {Phaser.Canvas}
	 */
	this.canvasPalette = null;

	/**
	 * Canvas of the options available for the editor
	 * Save, Quit, Erase, Change dimensions and other
	 * @type {Phaser.Canvas}
	 */
	this.canvasOptions = null;

	/**
	 * Key/Value of tiles with unique ID for each tiles
	 * @type {Object}
	 */
	this.tilesCode = {
		empty: null,
		ground: 'ground',
		ground_snow: 'ground_snow'
	};

	/**
	 * Current selected tile (default: ground)
	 * @type {this.tilesCode}
	 */
	this.selectedTile = this.tilesCode.ground;

	/**
	 * Détection tactile pour mobile pour ordinateur tactile
	 * @type {Boolean}
	 */
	this.isDown = false;

	/**
	 * Indicateur de gomme selectionné
	 * @type {Boolean}
	 */
	this.isEraser = false;

	/**
	 * Text to print the coordinate of the pointer
	 * @type {text}
	 */
	this.coordinateText = null;

	/**
	 * Text to print the current scroll of the map
	 * @type {text}
	 */
	this.scrollText = null;

};

Community.Editor.prototype = {

	preload: function() {
		// FPS
		this.game.time.advancedTiming = true;

		// Event listeners
		this.game.input.mouse.capture = true;
		this.game.input.onDown.add(this.onDown, this);
		this.game.input.onUp.add(this.onUp, this);
		this.game.input.addMoveCallback(this.printCoordinate, this);
	},

	create: function() {

		// add the capture of the mouse
		this.game.input.mouse.capture = true;

		this.drawGrid();
		//this.drawPalette();
		//this.drawOptions();
		

		this.empty();
	},

	render: function() {
		this.game.debug.text("FPS : " + this.game.time.fps || 'FPS : --', 2, 14, "#00ff00");
		var pos = this.game.input.activePointer.position;
		this.game.debug.text("x:" + pos.x + " y:" + pos.y, 2, 35);

		this.refreshGrid();
	},

	empty: function() {
		this.map = [];

		for (var y = 0; y < this.mapHeight; y++) {
			this.map[y] = [];

			for (var x = 0; x < this.mapWidth; x++) {
				this.map[y][x] = this.tilesCode.empty;
			}
		}
	},

	fromState: function(state) {
		var offsetY = this.mapHeight - state.length;

		for (var y = 0; y < state.length; y++) {
			for (var x = 0; x < state[y].length; x++) {
				this.map[y + offsetY][x] = state[y][x];
			}
		}
	},

	cloneState: function() {
		var clonedState = [];

		for (var y = 0; y < this.mapHeight; y++) {
			var tile = [];

			for (var x = 0; x < this.mapWidth; x++) {
				tile.push(this.map[y][x]);
			}

			clonedState.push(tile);
		}

		return clonedState;
	},

	changeWidth: function(width) {
		if (width < this.MINIMUM_WIDTH) {
			return;
		} else {
			// clone the current state
			var clonedState = this.cloneState();
			// change the width
			this.mapWidth = width;
			// reset it
			this.empty();
			// redo the map from cloned state
			this.fromState(clonedState);
		}
	},

	changeHeight: function(height) {
		if (height < this.MINIMUM_HEIGHT) {
			return;
		} else {
			var clonedState = this.cloneState();
			this.mapHeight = height;
			this.empty();
			this.fromState(clonedState);
		}
	},

	insertTile: function(x, y, tileCode) {
		if (this.withinBounds(x, y)) {
			this.map[y][x] = tileCode;
		} else {
			console.log("Out of bounds");
		}
	},

	deleteTile: function(x, y) {
		if (this.withinBounds(x, y)) {
			this.map[y][x] = null;
		} else return;
	},

	withinBounds: function(x, y) {
		return x >= 0 && x < this.mapWidth &&
			y >= 0 && y < this.mapHeight;
	},

	onDown: function(pointer) {
		this.printCoordinate(pointer);

		this.isDown = true;

		if (pointer.rightButton.isDown) {
			this.isEraser = true;
		} else {
			this.isEraser = false;
		}

		this.paint(pointer, this.selectedTile);
	},

	onUp: function() {
		this.isDown = false;
	},

	printCoordinate: function(pointer) {
		//  Get the grid loc from the pointer
		var x = this.game.math.snapToFloor(pointer.x - this.canvasGrid.x, this.tileWidth) / this.tileWidth;
		var y = this.game.math.snapToFloor(pointer.y - this.canvasGrid.y, this.tileWidth) / this.tileWidth;

		if (x < 0 || x >= this.mapWidth || y < 0 || y >= this.mapHeight) {
			return;
		}

		this.coordinateText.text = "X: " + (x + this.scrollX) + "\tY: " + (y + this.scrollY);
	},

	drawGrid: function() {
		// Create the canvas for the editor
		this.canvasEditor = this.game.make.bitmapData(this.MINIMUM_WIDTH * this.tileWidth, this.MINIMUM_HEIGHT * this.tileHeight);

		// Create the grid of the editor in black
		this.game.create.grid('drawingGrid', this.MINIMUM_WIDTH * this.tileWidth, this.MINIMUM_HEIGHT * this.tileHeight,
			this.tileWidth, this.tileHeight, 'rgba(0,0,0,0.7)');

		// Create the background of the editor, make a rectangle to limite it and draw the background
		this.canvasBackground = this.game.make.bitmapData(this.canvasEditor.width, this.canvasEditor.height);
		this.canvasBackground.draw('sky', 0, 0, this.canvasBackground.width, this.canvasBackground.height);

		// Coordinate of the canvas
		var x = 200, y = 100;
		this.canvasBackground.addToWorld(x, y);
		this.canvasGrid = this.game.add.sprite(x , y , 'drawingGrid');
		this.canvasGrid.crop(new Phaser.Rectangle(0, 0, this.MINIMUM_WIDTH * this.tileWidth, this.MINIMUM_HEIGHT * this.tileHeight));

		var style = {
			font: "20px Courier",
			fill: "#fff",
			tabs: 80
		};

		this.coordinateText = this.game.add.text(532, 10, "X: 0\tY: 0", style)
		this.scrollText = this.game.add.text(532, 30, "Scroll X : " + this.scrollX + "\tScroll Y : " + this.scrollY, style);
	},

	refreshGrid: function() {
		this.canvasBackground.clear();
		this.canvasBackground.draw('sky', 0, 0, this.canvasBackground.width, this.canvasBackground.height);

		for (var y = this.scrollY; y < this.mapHeight; y++) {
			for (var x = this.scrollX; x < this.mapWidth; x++) {

				var tile = this.map[y][x];
				if (tile != null) {
					this.canvasBackground.draw(tile, x * this.tileWidth, y * this.tileHeight);
				}
			}
		}
	},

	drawPalette: function() {
		this.canvasPalette = this.game.make.bitmapData(100, 400);

		this.canvasPalette.addToWorld(0, 0);
	},

	paint: function(pointer, tileCode) {
		//  Get the grid loc from the pointer
		var x = this.game.math.snapToFloor(pointer.x - this.canvasGrid.x, this.tileWidth) / this.tileWidth;
		var y = this.game.math.snapToFloor(pointer.y - this.canvasGrid.y, this.tileWidth) / this.tileWidth;

		console.log("x : " + x + " y : " + y);

		// Case 1: The user click out of the canvas editor
		if (x < 0 || x >= this.mapWidth || y < 0 || y >= this.mapHeight) {
			return;
		}

		// Case 2: The user didn't click but the function has been called
		if (!this.isDown)
			return;

		// Case 3: The eraser is selected
		if (this.isEraser) {
			this.insertTile(x, y, null);

		} else {
			// Add the tile to the map's array
			this.insertTile(x, y, tileCode)
		}
	},

	printMapConsole: function() {
		for (var y = 0; y < this.mapHeight; y++) {
			for (var x = 0; x < this.mapWidth; x++) {
				console.log(this.map[y][x]);
			}

			console.log("\n");
		}
	}

};