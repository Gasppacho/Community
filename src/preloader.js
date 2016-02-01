/* **************************************************************************** */
/* 														 ____   _    ___  	  	*/
/* 	 preloader.js										|  _ \ / \  ( _ ) 		*/
/* 														| |_) / _ \ / _ \ 		*/
/* 	 By: Pr0lexic										|  __/ ___ | (_) |		*/
/* 														|_| /_/   \_\___/ 		*/
/*   Created: 2016/01/17 by Pr0lexic											*/
/* 	 Updated: 2016/01/17 by Pr0lexic											*/
/*                  															*/
/* **************************************************************************** */

/**
 * Splash screen of the App, load all we need for the game
 * @param {Phaser.Game} game - Global variable of the game
 */
Community.Preloader = function(game) {

	/**
	 * Local reference to the game
	 * @type {Phaser.Game}
	 */
	this.game = game;

	/**
	 * loading bar
	 * @type {image}
	 */
	this.loadingbar = null;

	/**
	 * status of the loading
	 * @type {text}
	 */
	this.status = null;

	/**
	 * loading state
	 * @type {Boolean}
	 */
	this.ready = false;

};

Community.Preloader.prototype = {

	/**
	 * initialization of the splash screen
	 * @return {void} 
	 */
	init: function() {
		this.add.sprite(0, 0, 'loadingBG');
		this.loadingBar = this.add.sprite(this.game.world.centerX - (346 / 2), 400, 'loadingBar');
		this.status = this.make.text(this.world.centerX - 50, 350, 'Loading...', {
			fill: 'back'
		});
	},

	/**
	 * call all the loading function
	 * @return {void} 
	 */
	preload: function() {

		this.add.existing(this.status);

		// Loading bar
		this.load.setPreloadSprite(this.loadingBar);

		// Loading data 
		this.loadImages();
		this.loadSprites();
		this.loadAudio();
		this.loadScripts();

	},

	create: function() {
		this.status.setText('Ready !');
		this.addGameStates();

		// start menu
		this.state.start('Menu');
	},


	/**
	 * Loadging all the images of the App
	 * @return {void} 
	 */
	loadImages: function() {

		//Loading of every assets needed in the editor.        
		this.load.image('h', 'assets/images/horizontal.png');
		this.load.image('v', 'assets/images/vertical.png');
		this.load.image('sky', 'assets/images/sky.png');
		this.load.image('horizontal', 'assets/images/horizontal.png');
		this.load.image('sky', 'assets/images/sky.png');

		//Objets accessibles par le joueur pour l'editeur de niveaux
		this.load.image('boost_left', 'assets/images/boost_left.png');
		this.load.image('boost_right', 'assets/images/boost_right.png');
		this.load.image('checkpoint_empty', 'assets/images/checkpoint_empty.png');
		this.load.image('checkpoint_full', 'assets/images/checkpoint_full.png');
		this.load.image('diamond', 'assets/images/diamond.png');
		this.load.image('firstaid', 'assets/images/firstaid.png');
		this.load.image('gravity_inverser', 'assets/images/gravity_inverser.png');
		this.load.image('ground', 'assets/images/ground.png');
		this.load.image('ground_snow', 'assets/images/ground_snow.png');
		this.load.image('gravity_inverser', 'assets/images/gravity_inverser.png');
		this.load.image('instable', 'assets/images/instable.png');
		this.load.image('ladder', 'assets/images/ladder.png');
		this.load.image('lava', 'assets/images/lava.png');
		this.load.image('movable', 'assets/images/movable.png');
		this.load.image('platform', 'assets/images/platform.png');
		this.load.image('star', 'assets/images/star.png');
		this.load.image('vertical', 'assets/images/vertical.png');
		this.load.image('backSprite', 'assets/images/backToMenu.png');
		this.load.image('saveSprite', 'assets/images/Save.png');
		this.load.image('cursor', 'assets/images/cursor.png');

		this.load.image('menuBack', 'assets/images/theback.jpg');
		this.load.image('logo', 'assets/images/cube1.png');

		// Loading buttons
		this.load.image('buttonCreate', 'assets/buttons/creer.jpg');
		this.load.image('buttonPlay', 'assets/buttons/jouer.jpg');
		this.load.image('buttonCommunity', 'assets/buttons/commu.jpg');
		this.load.image('buttonMuteMusic', 'assets/buttons/mute.png');

	},

	/**
	 * Loading all the sprites of the App
	 * @return {void} 
	 */
	loadSprites: function() {
		this.load.spritesheet('dude', 'assets/sprites/dude.png', 32, 48);
	},

	/**
	 * Loading all the audio files of the App
	 * @return {void} 
	 */
	loadAudio: function() {
		this.load.audio('menuAudio', 'assets/musics/johncena.mp3');
	},

	/**
	 * Loading all the scripts of the App
	 * @return {void}
	 */
	loadScripts: function() {
		this.load.script('menu', 'src/menu.js');
		this.load.script('editor', 'src/editor.js');
	},

	/**
	 * Loading all videos of the App
	 * @return {void} 
	 */
	loadVideos: function() {

	},

	/**
	 * Add the game states to the Phaser game instance
	 */
	addGameStates: function() {
		this.state.add('Menu', Community.Menu);
		//this.state.add('Editor', Community.Editor);
		console.log("hello boot");
	}

};