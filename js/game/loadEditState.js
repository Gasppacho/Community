var loadEditState = {
    
    preload: function() {
        
        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Arial', fill: '#ffffff'});
        
        /**
        *   Loading of every assets needed in the editor.
        */
        game.load.image('h', 'assets/horizontal.png');
 		game.load.image('v', 'assets/vertical.png');
		game.load.image('sky', 'assets/sky.png');
        game.load.image('horizontal', 'assets/horizontal.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.image('baddie', 'assets/baddie.png');
        game.load.image('sky', 'assets/sky.png');
        
        /**
         *  Loading controller assets
         */
        game.load.spritesheet('buttonMove', 'assets/button-horizontal.png',96,64);
        game.load.spritesheet('buttonAction', 'assets/button-round.png',96,96);
        
        
        //Objets accessibles par le joueur pour l'editeur de niveaux
        game.load.image('boost_left', 'assets/boost_left.png');
        game.load.image('boost_right', 'assets/boost_right.png');
        game.load.image('checkpoint_empty', 'assets/checkpoint_empty.png');
        game.load.image('checkpoint_full', 'assets/checkpoint_full.png');
        game.load.image('diamond', 'assets/diamond.png');
        game.load.image('firstaid', 'assets/firstaid.png');
        game.load.image('gravity_inverser', 'assets/gravity_inverser.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('ground_snow', 'assets/ground_snow.png');
        game.load.image('gravity_inverser', 'assets/gravity_inverser.png');
        game.load.image('instable', 'assets/instable.png');
        game.load.image('ladder', 'assets/ladder.png');
        game.load.image('lava', 'assets/lava.png');
        game.load.image('movable', 'assets/movable.png');
        game.load.image('platform', 'assets/platform.png');
        game.load.image('player', 'assets/player.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('vertical', 'assets/vertical.png');
        game.load.image('backSprite', 'assets/backToMenu.png');
        game.load.image('saveSprite', 'assets/Save.png');
        game.load.image('cursor', 'assets/cursor.png');

    },
    create: function() {
        game.state.start('edit');
    }
}