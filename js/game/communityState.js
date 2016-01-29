var communityState = {
    create: function () {
        
        background = game.add.tileSprite(0, 0, 800, 600, 'coming');
        text = game.add.text(70, 80, 'Page de la Communauté', { font: '50px BankGothic LT BT', fill: '#ffffff' });
	    text = game.add.text(120, 300, 'We are still working', { font: '50px BankGothic LT BT', fill: '#000000' });
	    text = game.add.text(350, 400, 'on it', { font: '50px BankGothic LT BT', fill: '#000000' });
        
        // bouton de retour.
        buttonBack = game.add.button(750, 20, 'boost_left', backToMenu);
        buttonBack.scale.setTo(0.5, 0.5);
        buttonBack.fixedToCamera = true;
    }
};