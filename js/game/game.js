/**
 *  Création de la variable PHASER game.
 */
//var game = new Phaser.Game(800, 480, Phaser.AUTO, 'gameDiv');
//var game = new Phaser.Game(800, 480, Phaser.CANVAS);
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

/**
 *  Cration de tout les STATE.
 */
game.state.add('load', loadState);
game.state.add('loadMenu', loadMenuState);
game.state.add('menu', menuState);
game.state.add('community', communityState);
game.state.add('loadGame', loadGameState);
game.state.add('loadLevel', loadLevelState);
game.state.add('level', levelState);
game.state.add('loadEdit', loadEditState);
game.state.add('play', playState);
game.state.add('edit', editState);
game.state.add('win', winState);

game.state.start('load');