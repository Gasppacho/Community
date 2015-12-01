var menuState = {

	/**
	 * CREATE is a standard Phaser function which is automaticaly call.
	 */
	create: function() {

		// Label main title
		var nameLabel = game.add.text(80, 80, 'Community', { font: '50px Arial', fill: '#ffffff' });

		// Label instruction
		var startLabel = game.add.text(80, game.world.height - 80, 'press "W" to start level', { font: '25px Arial', fill: '#ffffff' });
        var startLabel = game.add.text(80, game.world.height - 160, 'press "X" to start edit', { font: '25px Arial', fill: '#ffffff' });
        var startLabel = game.add.text(500, game.world.height - 500, '', { font: '25px Arial', fill: '#ffffff' });
        startLabel.text = 
        "Commandes : " 
        +"\n -A pour bloc precedent"
        +"\n -Z pour bloc suivant"
        +"\n -Q pour poser bloc"
        +"\n -G pour (des)activer gravité"
        +"\n -FLECHES pour déplacements";

        //Affichage du logo
        game.add.sprite(150, 250, 'logo');
		/**
		 * A key listener is added for the key 'W' and 'X'.
		 * This key will start the game or the editor while we don't have a real menu.
		 */
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		wkey.onDown.addOnce(this.startGame, this);
        
        var xkey = game.input.keyboard.addKey(Phaser.Keyboard.X);
		xkey.onDown.addOnce(this.startEdit, this);

	},

	startGame: function() {
		game.state.start('loadGame');
	},
    
    startEdit: function() {
        game.state.start('loadEdit');
    }
};