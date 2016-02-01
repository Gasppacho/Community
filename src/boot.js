/* **************************************************************************** */
/* 														 ____   _    ___  	  	*/
/* 	 boot.js											|  _ \ / \  ( _ ) 		*/
/* 														| |_) / _ \ / _ \ 		*/
/* 	 By: Pr0lexic										|  __/ ___ | (_) |		*/
/* 														|_| /_/   \_\___/ 		*/
/*   Created: 2016/01/17 by Pr0lexic											*/
/* 	 Updated: 2016/01/17 by Pr0lexic											*/
/*                  															*/
/* **************************************************************************** */

/**
 * Main class of the App.
 * Put all variable you want to be persistant regardless of State swaps
 * @type {Object}
 */
Community = {

	/**
	 * The game will check Community.orientated to pause or not
	 * @type {Boolean}
	 */
	orientated: false,

	/**
	 * Dimension of the user's screen width
	 * @type {Int}
	 */
	screenWidth: window.innerWidth,

	/**
	 * Dimension of the user's screen height
	 * @type {Int}
	 */
	screenHeight: window.innerHeight

};

/**
 * Booting of the App (i.e starting point)
 * @param {Phaser.Game} game - Global variable of the game
 */
Community.Boot = function(game) {

	/**
	 * Local reference to the game
	 * @type {Phaser.Game} game
	 */
	this.game = game;

};

/**
 * Prototypes of Boot
 * @type {Object}
 */
Community.Boot.prototype = {

	/**
	 * Loading of files needed for splash screen
	 * @return {void} 
	 */
	preload: function() {

		// load images for splash screen
		this.game.load.image('loadingBG', 'assets/images/LoadingBG.png');
		this.game.load.image('loadingBar', 'assets/images/Loading.png');

		// load splash screen script
		this.game.load.script('preloader', 'src/preloader.js');

	},

	/**
	 * sStart the splash screen
	 * @return {void} 
	 */
	create: function() {

		// resize the screen 
		// for desktop
		if (this.game.device.desktop) {
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.minWidth = 320;
			this.scale.minHeight = 240;
			this.scale.maxWidth = Community.screenWidth;
			this.scale.maxHeight = Community.screenHeight;
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
		}
		// for mobile
		else {
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.minWidth = 480;
			this.scale.minHeight = 260;
			this.scale.maxWidth = 1024;
			this.scale.maxHeight = 768;
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
			this.scale.forceOrientation(true, false);
			this.scale.setResizeCallback(this.gameResized, this);
			this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
			this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
		}

		// add splash screen script to game
		this.game.state.add('Preloader', Community.Preloader);
		// once file for splash screen loaded, start splash screen
		this.game.state.start('Preloader');
	},

	/**
	 * Resizing the screen
	 * @param  {Int} width  new width of the screen
	 * @param  {Int} height new Height of the screen
	 * @return {void}        
	 */
	gameResized: function(width, height) {

	},

	/**
	 * display "change orientation" image 	
	 * @return {void}
	 */
	enterIncorrectOrientation: function() {

		Community.orientated = false;

		document.getElementById('orientation').style.display = 'block';

	},

	/**
	 * on good orientation of the device, stop display "change orientation"
	 * @return {void} 
	 */
	leaveIncorrectOrientation: function() {

		Community.orientated = true;

		document.getElementById('orientation').style.display = 'none';

	}

};