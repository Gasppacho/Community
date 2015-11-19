var winState = {

	create: function() {

		var winLabel = game.add.text(80, 80, 'You Win !', { font: '50px Arial', fill: '#00ff00' });

		var restartLabel = game.add.text(80, game.world.height - 80, 'press "W" to restart', { font: '25px Arial', fill: '#ffffff' });

		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		wkey.onDown.addOnce(this.restart, this);

	},

	restart: function() {
		game.state.start('menu');
	}

};