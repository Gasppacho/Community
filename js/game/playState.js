/**
 * play session variables
 */
//variable représentant le joueur - a changer par une classe ? (avec vies etc.. dedans)
var player;
//nombre de vies = 3
var nbr_vies = 3;
//intialisation des 3 coeurs de vie (pour les sprites)
var vie1, vie2, vie3; 
/**
 *  variables de groupes pour la map
 *  
 *  @var {group} [description] platforms autorise les collisions 
 *  @var {group} [description] throwable n'autorise pas les collisions
 *  @var {map} [description] map est un tableau de pair clef / groupe pour les différents types de blocs
 *  
 */
var platforms; //le groupe des plateformes
var throwable; //le sous groupe de plateformes traversables
var map = {}; //la map qui contient l'ensemble des blocs d'un level


var cursors;
var wkey;
var loader = new MapLoader();
////////////DEBUT TEST////////////////
var stats = {};
var statistiques = new Statistiques();
var panneau_stats_afficher = true; //autorise l'affichage des statistiques
var stats_label;
////////////FIN TEST//////////////////
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

var damageCounter = 0;


function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'score: ' + score;

}

//calcul l'acceleration / deceleration du joueur 
/*function gforce (player) {
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
}*/

function victory() {
    
    /**
     *  Label de victoire et de défaite
     */
    var restartLabel = game.add.text(80, game.world.height - 500, '', { font: '25px Arial', fill: '#ffffff' });

    counting = false;

    restartLabel.setText("You Win ! ");
    restartLabel.fixedToCamera = true;
    
    //var restartLabel2 = game.add.text(80, game.world.height - 180, '', { font: '25px Arial', fill: '#ffffff' });
    
       /* if(score >= 100) {	
             
            counting = false;
            restartLabel.setText("You Win ! ");
            restartLabel.fixedToCamera = true;
        } */
        /*if (!isAlive()){
            player.kill();
            restartLabel.setText("You Lose ! ");
            restartLabel.fixedToCamera = true;
            //restartLabel2.setText("Press W to restart !");
            //restartLabel2.fixedToCamera = true;
            
        }*/
        
}

function damage() {
    if (damageCounter >20){
        nbr_vies = nbr_vies - 1;
        damageCounter = 0;
        if (nbr_vies == 2){
            //console.log("vie 1 perdue");
            vie1.kill();
            statistiques.UP("lost_lives", 1);
        }
        else if (nbr_vies == 1){
            //console.log("vie 2 perdue");
            vie2.kill();
            statistiques.UP("lost_lives", 1);
        }
        else if (nbr_vies == 0)
        {
            //console.log("vie 3 perdue");
            vie3.kill();
            statistiques.UP("lost_lives", 1);
        }
        else{
            defeat();
        }


    }
    else
    {
        damageCounter++;
    }
}

function defeat() {

    
        var defeatLabel = game.add.text(80, game.world.height - 500, 'YOU LOOSE !');
        defeatLabel.fixedToCamera = true;
        this.player.kill();
        counting = false;
         defeatCounter = 0;
       statistiques.UP("game_overs", 1);

    
    
}

function backToMenu() {
    // réinitialisation des variables.
    score = 0;
    counter = 0;
    counting = true;
    map = {};
    
    // on lance la loadState pour le menu.
    game.state.start('load');
}

function updateTimer(){
    if(counting){
        counter ++;
    }
}

function displayStats(){
    //afficher le panneau
    if (panneau_stats_afficher){
        //var defeatLabel = game.add.text(80, game.world.height - 500, "game overs : " + statistiques.get_str("game_overs"));
        panneau_stats_afficher = false;
        stats_label.setText(statistiques.allToString());
        
    }
    //supprimer le panneau
    else{
        panneau_stats_afficher = true;
        stats_label.setText("");
    }
}



var playState = {
    
    
    ini: function(){
        score = 0;
        counter = 0;
        counting = true;
    },
	

	create: function() {
        
        wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

		// Game world size & background
		game.add.tileSprite(0, 0, 1600, 1200, 'sky');
		game.world.setBounds(0, 0, 1600, 600);

		//  We're going to be using physics, so enable the Arcade Physics system
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //  A simple background for our game
	    game.add.sprite(0, 0, 'sky');
	    
        /**
         * Initialisation des varaibles de groupe avec ou sans collisions
         */
        /*platforms = game.add.group();
        platforms.enableBody = true;

        throwable = game.add.group();
        throwable.enableBody = true;*/

        // The player and its settings
        player = game.add.sprite(32, game.world.height - 300, 'dude');

        /**
         * Génération du niveau depuis un json ou le localStorage
         * Envois des différents groupe pour la gestion des différents blocs
         */
        game = loader.load(game, map);

        /*
        DEBUT DE L'INITIALISATION DES STATS
         */
        statistiques.load();
        statistiques.UP("maps_played", 1);
        // bouton des statistiques
        buttonStats = game.add.button(650, 20, 'StatsSprite', displayStats);
        buttonStats.scale.setTo(0.5, 0.5);
        buttonStats.fixedToCamera = true;
        //text des stats
        stats_label = game.add.text(100, 100, '', { font: '25px Arial', fill: '#ffffff' });
        stats_label.fixedToCamera = true;       
        /*
        FIN DE L'INITIALISATION DES STATS
         */
        
        //ajout des 3 vies
        vie1 = game.add.sprite(550, 50, 'firstaid');
        vie1.scale.setTo(0.5, 0.5);
        vie1.fixedToCamera = true;
        vie2 = game.add.sprite(570, 50, 'firstaid');
        vie2.scale.setTo(0.5, 0.5);
        vie2.fixedToCamera = true;
        vie3 = game.add.sprite(590, 50, 'firstaid');
        vie3.scale.setTo(0.5, 0.5);
        vie3.fixedToCamera = true;

	    //  We need to enable physics on the player
	    game.physics.arcade.enable(player);

	    //  Player physics properties. Give the little guy a slight bounce.
	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 600;
	    player.body.collideWorldBounds = true; //desactiver pour permettre de sortir de l'ecran

	    //  Our two animations, walking left and right.
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('right', [5, 6, 7, 8], 10, true);

	    //  Finally some stars to collect
	    //stars = game.add.group();

	    //  We will enable physics for any star that is created in this group
	    //stars.enableBody = true;
	    player.inputEnabled = true;
	    player.input.enableDrag();

	    //  Code de spawn des étoiles par défaut
	   /* for (var i = 0; i < 12; i++)
	    {
	        //  Create a star inside of the 'stars' group
	        var star = stars.create(i * 70, 0, 'star');

	        //  Let gravity do its thing
	        star.body.gravity.y = 300;

	        //  This just gives each star a slightly random bounce value
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }*/

	    //  Affichage du score
	    //scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        //scoreText.fixedToCamera = true;

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
        
        /////////////////////////////////////////////////
        /// DEBUT DE LA ZONE DE TEST COLLIDE
        /////////////////////////////////////////////////

        //collision entre les plateformes
	    //game.physics.arcade.collide(platforms, platforms);
	    //game.physics.arcade.collide(player, platforms);
        //game.physics.arcade.collide(player, throwable);
        if('ground' in map) {
            game.physics.arcade.collide(player, map['ground']);
        }
        if('ground_snow' in map) {
            game.physics.arcade.collide(player, map['ground_snow']);
        }
        if('movable' in map) {
            game.physics.arcade.collide(player, map['movable']);
        }

        if('lava' in map){
            game.physics.arcade.overlap(player, map['lava'], damage, null, this);
        }
        /////////////////////////////////////////////////
        // // FIN DE LA ZONE DE TEST COLLIDE
	    /////////////////////////////////////////////////
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
	    ///game.physics.arcade.overlap(player, stars, collectStar, null, this);

	    //  Reset the players velocity (movement)
	    player.body.velocity.x = 0;
        statistiques.distance_manager(player.body.x, player.body.y);
        statistiques.time_manager();

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
            statistiques.UP("jumps", 1);
	    }
        
        //determine si le joueur a gagné ou perdu
        //restartLabel.setText ("You Win !");
        
        //victory();
	    
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

