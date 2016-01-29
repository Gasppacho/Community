var loadLevelState = {
    
    preload: function(){
        game.load.image('back', 'assets/theback.jpg');
        game.load.image('levelpict', 'assets/level.png');
        
    },
    
    create: function(){
        game.state.start('level');
    }
}