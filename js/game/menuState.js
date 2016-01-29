var menuState = {

	/**
	 * CREATE is a standard Phaser function which is automaticaly call.
	 */
	create: function() {
        /**
		// Label main title
		var nameLabel = game.add.text(80, 80, 'Community', { font: '50px Arial', fill: '#ffffff' });

		// Label instruction
		var startLabel = game.add.text(80, game.world.height - 80, 'press "W" to start level', { font: '25px Arial', fill: '#ffffff' });
        var startLabel = game.add.text(80, game.world.height - 160, 'press "X" to start edit', { font: '25px Arial', fill: '#ffffff' });

		/**
		 * A key listener is added for the key 'W' and 'X'.
		 * This key will start the game or the editor while we don't have a real menu.
		 */
		/*var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		wkey.onDown.addOnce(this.startGame, this);
        
        var xkey = game.input.keyboard.addKey(Phaser.Keyboard.X);
		xkey.onDown.addOnce(this.startEdit, this);
        */
        background = game.add.tileSprite(0, 0, 800, 600, 'back');

        game.add.sprite(450, 200, 'logo');


        buttonCreate = game.add.button(25, 400, 'buttonCreate', startEdit, this, 1);

        buttonPlay = game.add.button( 25, 100, 'buttonPlay', startGame, this, 1);

        buttonCommu = game.add.button(25, 250, 'buttonCommu', startCommunity, this, 1);

        text = game.add.text(450, 80, 'Community', { font: '50px BankGothic LT BT', fill: '#ffffff' });

	}

	/*startGame: function() {
		game.state.start('loadGame');
	},*/
    
    /*startEdit: function() {
        game.state.start('loadEdit');
    }*/
};

function startEdit () {
    game.state.start('loadEdit');
}
function startGame () {
    game.state.start('loadLevel');
}
function startCommunity () {
    game.state.start('community');
}