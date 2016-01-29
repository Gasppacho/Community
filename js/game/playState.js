/**
 * play session variables
 */
var player;
var platforms;
var cursors;
var wkey;
var loader = new MapLoader();

//  Variables pour les mouvements.
var left = false;
var right = false;
var up = false;
var down = false;


var stars;
var score = 0;
var scoreText;
//VARIABLES PHYSIQUES
var preSpeed = 0; //fonction gforce : vitesse precedente


var counter = 0;
var counting = true;



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
    var restartLabel = game.add.text(80, game.world.height - 500, '', { font: '25px Arial', fill: '#ffffff' });
    
    //var restartLabel2 = game.add.text(80, game.world.height - 180, '', { font: '25px Arial', fill: '#ffffff' });
    
        if(score >= 100) {	
             
            counting = false;
            restartLabel.setText("You Win ! ");
            restartLabel.fixedToCamera = true;
            //restartLabel2.setText("Press W to restart !");
            //restartLabel2.fixedToCamera = true;
            console.log("score win");
        }
        if (!isAlive()){
            player.kill();
            restartLabel.setText("You Lose ! ");
            restartLabel.fixedToCamera = true;
            //restartLabel2.setText("Press W to restart !");
            //restartLabel2.fixedToCamera = true;
            
        }
       
        if (wkey.isDown) ///////////GROS PROBLEME -- BUG A CE NIVEAU
            {
                score = 0;
                game.state.start('load')
            }
        
}

function backToMenu() {
    // réinitialisation des variables.
    score = 0;
    
    // on lance la loadState pour le menu.
    game.state.start('load');
}

function updateTimer(){
    if(counting){
        counter ++;
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
	    player = game.add.sprite(32, game.world.height - 300, 'dude');

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
	    player.inputEnabled = true;
	    player.input.enableDrag();

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
        scoreText.fixedToCamera = true;

	    //  Our controls.
	    cursors = game.input.keyboard.createCursorKeys();

	    /**
	     * Creation of a camera following the player
	     */
	    game.camera.follow(player);
        
        //ending message
        
        /* boutons */
        buttonLeft = game.add.button(0, game.world.height - 100, 'movable', left);
        //buttonLeft.scale.setTo(0.5, 0.5);
        buttonLeft.fixedToCamera = true;
        buttonLeft.events.onInputDown.add(function(){left = true;});
        buttonLeft.events.onInputUp.add(function(){left = false;});

        buttonRight = game.add.button(100, game.world.height - 100, 'movable', right);
        //buttonRight.scale.setTo(0.5, 0.5);
        buttonRight.fixedToCamera = true;
        buttonRight.events.onInputDown.add(function(){right = true;});
        buttonRight.events.onInputUp.add(function(){right = false;});

        buttonUp = game.add.button(700, game.world.height - 100, 'movable', up);
        //buttonUp.scale.setTo(0.5, 0.5);
        buttonUp.fixedToCamera = true;
        buttonUp.events.onInputDown.add(function(){up = true;});
        buttonUp.events.onInputUp.add(function(){up = false;});   
        
        
        // bouton de retour.
        buttonBack = game.add.button(750, 20, 'backSprite', backToMenu);
        buttonBack.scale.setTo(0.5, 0.5);
        buttonBack.fixedToCamera = true;
        
        pauseLabel = game.add.text(400, game.world.height - 100, 'PAUSE', { font: '25px Arial', fill: '#ffffff' });
        pauseLabel.inputEnabled = true;
        pauseLabel.events.onInputUp.add(function () {game.paused = true});
        pauseLabel.fixedToCamera = true;

        game.input.onDown.add(unPause, self);
        
        function unPause(){
            if(game.paused == true){
                game.paused = false;
            }            
        }
        
        /*timer = new Phaser.Timer(game);
        timer.start();*/
        
        this.timer = game.time.create(false);
        this.timer.loop(Phaser.Timer.SECOND, updateTimer, this);
        this.timer.start();
        
        timeLabel = game.add.text(400, 50, '0', { font: '25px Arial', fill: '#ffffff' });
        timeLabel.fixedToCamera = true;
        
	},

	update: function() {
        
        timeLabel.setText('' + counter);
        

		//  Collide the player and the stars with the platforms
	    game.physics.arcade.collide(player, platforms);
	    game.physics.arcade.collide(stars, platforms);
	    game.physics.arcade.collide(platforms, platforms);
	    
	    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
	    game.physics.arcade.overlap(player, stars, collectStar, null, this);

	    //  Reset the players velocity (movement)
	    player.body.velocity.x = 0;

	    if (cursors.left.isDown || left)
	    {
	        //  Move to the left
	        player.body.velocity.x = -150;

	        player.animations.play('left');
	    }
	    else if (cursors.right.isDown || right)
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
	    if ((cursors.up.isDown || up) && player.body.touching.down)
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
	},
    
    paused: function () {
       /* if (this.pauseLabel)
        {
            //this.pausedSprite.visible = true;
            this.pauseLabel.visible = true;
            
        }
        else
        {*/
            //this.pausedSprite = this.make.sprite(0, 0, 'paused');
            //this.stage.addChild(this.pausedSprite);
            //this.pauseLabel.visible = true;
            
        //}
    }


};

