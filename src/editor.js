/* **************************************************************************** */
/* 														 ____   _    ___  	  	*/
/* 	 preloader.js										|  _ \ / \  ( _ ) 		*/
/* 														| |_) / _ \ / _ \ 		*/
/* 	 By: 												|  __/ ___ | (_) |		*/
/* 														|_| /_/   \_\___/ 		*/
/*   Created: 2016/02/01 by 													*/
/* 	 Updated: 2016/02/01 by 													*/
/*                  															*/
/* **************************************************************************** */

/**
 * Editor Community
 * @param {Phase.Game} game Instance of the Phaser.Game (i.e Community itself)
 */
Community.Editor = function(game) {

	this.player = null;

	this.platforms = null;

	this.line1 = null;

	this.left = false;

	this.right = false;

	this.up = false;

	this.down = false;

	this.currentBloc = 'ground';

	this.saver = new MapSaver();

	this.cursors = null;

	/**
	 * Identifiant du bloc choisi
	 * @type {Number}
	 */
	this.id = 0;

	/**
	 * Identifiant de l'effet choisi
	 * @type {Number}
	 */
	this.idf = 0;

	/**
	 * Bloc de prévisualisation dans le menu de selection
	 * @type {bloc}
	 */
	this.bloc_preview = null; 
	
	/**
	 * Liste des blocs pouvant être placés
	 * @type {Array}
	 */
	this.liste_blocs = [
		'boost_left',
		'boost_right',
		'checkpoint_empty',
		'checkpoint_full',
		'diamond',
		'firstaid',
		'gravity_inverser',
		'ground',
		'ground_snow',
		'instable',
		'ladder',
		'lava',
		'movable',
		'star'
	];

	/**
	 * liste des blocs dans le menu de selection (10 affichés d'un coup)
	 * @type {Array}
	 */
	this.liste_boutons_menu_blocs = [ 
		'bloc1',
		'bloc2',
		'bloc3',
		'bloc4',
		'bloc5',
		'bloc6',
		'bloc7',
		'bloc8',
		'bloc9',
		'bloc10'
	];

	/**
	 * Liste des effets
	 * @type {Array}
	 */
	this.liste_effets = [
		"gravity",
		"sticky"
	];

	/**
	 * Indicateur de pression sur les mobiles ?
	 * @type {Boolean}
	 */
	this.unPress = true;
};

Community.Editor.prototype = {

	preload: function() {
		console.log("Fuck");
	}

};