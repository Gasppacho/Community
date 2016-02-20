/* **************************************************************************** */
/* 														 ____   _    ___  	  	*/
/* 	 menu.js											|  _ \ / \  ( _ ) 		*/
/* 														| |_) / _ \ / _ \ 		*/
/* 	 By: Cédric Benet									|  __/ ___ | (_) |		*/
/* 														|_| /_/   \_\___/ 		*/
/*   Created: 2016/01/17 by Cédric Benet										*/
/* 	 Updated: 2016/01/17 by Cédric Benet										*/
/*                  															*/
/* **************************************************************************** */

Community.Menu = function(game) {

	/**
	 * Ajout d'une musique de menu ?
	 * @type {Phaser Music}
	 */
	this.music = null;

	/**
	 * Indicateur d'arret ou de reprise de la musique
	 * @type {Boolean}
	 */
	this.musicMuted = false;

	/**
	 * Bouton pour lancer le jeu
	 * @type {Phaser.button}
	 */
	this.buttonPlay = null;

	/**
	 * Boutton pour créer une map
	 * @type {Phaser.button}
	 */
	this.buttonCreate = null;

	/**
	 * Boutton pour accéder à l'ensemble des maps de la community
	 * @type {Phaser.button}
	 */
	this.buttonCommunity = null;

	/**
	 * Boutton pour mute la music
	 * @type {[type]}
	 */
	this.buttonMuteMusic = null;


};

Community.Menu.prototype = {

	create: function() {

		this.music = this.add.audio('menuAudio');
		this.music.loop = true;
		this.music.play();

		// Ajout du background
		this.add.tileSprite(0, 0, 800, 600, 'menuBack');

		// Logo
		this.add.sprite(450, 200, 'logo');
		this.add.text(450, 80, 'Community', {
			font: '50px BankGothic LT BT',
			fill: '#ffffff'
		});

		// Connection des bouttons
		this.buttonPlay = this.add.button(25, 100, 'buttonPlay', this.startGame, this, 1);
		this.buttonCommunity = this.add.button(25, 250, 'buttonCommunity', this.startCommunity, this, 1);
		this.buttonCreate = this.add.button(25,400, 'buttonCreate', this.startCreate, this, 1);
		this.buttonMuteMusic = this.add.button(700,10, 'buttonMuteMusic', this.muteMusic, this, 1);	// todo : changer le boutton mute / pas mute ... ?

	},

	startGame: function() {
		this.music.stop();

		this.state.start('Play', 'level1');
		// start game
	},

	startCreate: function() {
		this.music.stop();

		this.state.start('Editor');
	},

	startCommunity: function() {
		this.music.stop();

		// start community
	},

	muteMusic: function() {

		if(this.musicMuted) {
			this.music.volume = 1;
			this.musicMuted = false;
		} else {
			this.music.volume = 0;
			this.musicMuted = true;
		}

	}

};