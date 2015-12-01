var loadState = {

	    preload: function() {
        
       /**
        *   In this state, it will be load every assets and ressources for every menu.
        */
        
       /**
        *   This is the number of simultaneous touch we allow
        */
        this.input.maxPointers = 1;
         //easter egg
        game.load.image('logo', 'assets/logo.png');
        
        /**
        *   Scaling option
        */
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
       /**
        *   Have the game centered
        */
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
       /**
        *   The screeb size will be set automatically
        */
        game.scale.setScreenSize(true);		
        game.scale.startFullScreen(true);
        
    },
    
    create: function() {
        game.state.start('menu');
    }
    
};