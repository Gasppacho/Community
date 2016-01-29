/**
 *  Création de la variable PHASER game.
 */
var game = new Phaser.Game(1080, 720, Phaser.AUTO, 'gameDiv');

/**
 *  Cration de tout les STATE.
 */
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('loadGame', loadGameState);
game.state.add('loadEdit', loadEditState);
game.state.add('play', playState);
game.state.add('edit', editState);
game.state.add('win', winState);

game.state.start('load');