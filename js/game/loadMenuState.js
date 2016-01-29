var loadMenuState = {
    
    preload: function(){
        
        game.load.image('logo', 'assets/cube1.png');
        game.load.spritesheet('buttonCreate', 'assets/button/creer.jpg', 228, 72);
        game.load.spritesheet('buttonPlay', 'assets/button/jouer.jpg', 228, 72);
        game.load.spritesheet('buttonCommu', 'assets/button/commu.jpg', 228, 72);
        game.load.image('back', 'assets/theback.jpg');
        game.load.image('coming', 'assets/comingsoon.jpg');
        
    },
    
    create: function(){
        game.state.start('menu');
    }
}