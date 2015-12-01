/**
 * play session variables
 */
var player;
var platforms;
var cursors;
var wkey;
var loader = new MapLoader();


var stars;
var score = 0;
var scoreText;
//VARIABLES PHYSIQUES
var preSpeed = 0; //fonction gforce : vitesse precedente

function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'score: ' + score;



}

//calcul l'acceleration / deceleration du joueur 
function gforce (player) {
    //calcul du delta entre vitesse precedente et actuelle
    var delta = Math.abs(preSpeed) - Math.abs(player.body.velocity.y);
    preSpeed = player.body.velocity.y;
    //debugText.text = 'DELTA : ' + Math.floor(delta);
    return delta;
}


//retourne vrai si le joueur est vivant
function isAlive() {
    //condition de mort par deceleration / acceleration trop forte
    if (gforce(player) >= 400)
    {
        
        return false;
    }
    //Si toutes les conditions ci dessus ont échoué, alors le joueur est vivant
    else{
        return true;
    }
}

function victory() {
    
    /**
     *  Label de victoire et de défaite
     */
    var restartLabel = game.add.text(80, game.world.height - 100, '', { font: '25px Arial', fill: '#ffffff' });
    
    var restartLabel2 = game.add.text(80, game.world.height - 80, '', { font: '25px Arial', fill: '#ffffff' });
    
        if(score >= 100) {	
             
              restartLabel.setText("You Win ! ");
            restartLabel2.setText("Press W to restart !");
            score = 0;
        }
        if (!isAlive()){
            player.kill();
             restartLabel.setText("You Lose ! ");
            restartLabel2.setText("Press W to restart !");
            
        }
       
        if (wkey.isDown) ///////////GROS PROBLEME -- BUG A CE NIVEAU
            {
                score = 0;
                game.state.start('load')
            }
        
}




var playState = {

	

	create: function() {
        
        wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);


		// Game world size & background
		game.add.tileSprite(0, 0, 1600, 1200, 'sky');
		game.world.setBounds(0, 0, 1600, 600);

		//  We're going to be using physics, so enable the Arcade Physics system
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //  A simple background for our game
	    game.add.sprite(0, 0, 'sky');

	    //  The platforms group contains the ground and the 2 ledges we can jump on
	    platforms = game.add.group();

	    //  We will enable physics for any object that is created in this group
	    platforms.enableBody = true;
        
        var ground = loader.load(platforms);
        

	    // The player and its settings
	    player = game.add.sprite(32, game.world.height - 150, 'dude');

	    //  We need to enable physics on the player
	    game.physics.arcade.enable(player);

	    //  Player physics properties. Give the little guy a slight bounce.
	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 600;
	    //player.body.collideWorldBounds = true; desactiver pour permettre de sortir de l'ecran

	    //  Our two animations, walking left and right.
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('right', [5, 6, 7, 8], 10, true);

	    //  Finally some stars to collect
	    stars = game.add.group();

	    //  We will enable physics for any star that is created in this group
	    stars.enableBody = true;

	    //  Here we'll create 12 of them evenly spaced apart
	    for (var i = 0; i < 12; i++)
	    {
	        //  Create a star inside of the 'stars' group
	        var star = stars.create(i * 70, 0, 'star');

	        //  Let gravity do its thing
	        star.body.gravity.y = 300;

	        //  This just gives each star a slightly random bounce value
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }

	    //  The score
	    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

	    //  Our controls.
	    cursors = game.input.keyboard.createCursorKeys();

	    /**
	     * Creation of a camera following the player
	     */
	    game.camera.follow(player);
        
        //ending message
        
        
        
        
        

	},

	update: function() {

		//  Collide the player and the stars with the platforms
	    game.physics.arcade.collide(player, platforms);
	    game.physics.arcade.collide(stars, platforms);
	    game.physics.arcade.collide(platforms, platforms);

	    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
	    game.physics.arcade.overlap(player, stars, collectStar, null, this);

	    //  Reset the players velocity (movement)
	    player.body.velocity.x = 0;

	    if (cursors.left.isDown)
	    {
	        //  Move to the left
	        player.body.velocity.x = -150;

	        player.animations.play('left');
	    }
	    else if (cursors.right.isDown)
	    {
	        //  Move to the right
	        player.body.velocity.x = 150;

	        player.animations.play('right');
	    }
	    else
	    {
	        //  Stand still
	        player.animations.stop();

	        player.frame = 4;
	    }
	    
	    //  Allow the player to jump if they are touching the ground.
	    if (cursors.up.isDown && player.body.touching.down)
	    {
	        player.body.velocity.y = -450;
	    }
        
        //determine si le joueur a gagné ou perdu
        //restartLabel.setText ("You Win !");
        
        victory();
	    
	},

	restart: function() {
		score = 0;
		game.state.start('load');
	}

};

