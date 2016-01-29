var levelState = {

	create: function() {

	background = game.add.tileSprite(0, 0, 800, 600, 'back');

	//image 1
	var image = game.add.sprite(25,260, 'levelpict');
	image.inputEnabled = true;
	image.events.onInputDown.add(listener, this);


	//image 2
	var image2 = game.add.sprite(25 ,25, 'levelpict');
	image2.inputEnabled = true;
	image2.events.onInputDown.add(listener, this);


	//image 3
	var image3 = game.add.sprite(420 ,25, 'levelpict');
	image3.inputEnabled = true;
	image3.events.onInputDown.add(listener, this);

	//image 4
	var image4 = game.add.sprite(420 ,260, 'levelpict');
	image4.inputEnabled = true;
	image4.events.onInputDown.add(listener, this);

  
	text = game.add.text(175, 200, 'Choose your level', { font: '50px BankGothic LT BT', fill: '#ffffff' });

	}
    

};

function listener () {
    game.state.start('loadGame');
}
