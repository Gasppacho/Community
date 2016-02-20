Community.Play = function(game) {

	/**
	 * Local variable of game
	 * @type {[type]}
	 */
	this.game = game;

	this.map = {};

	/**
	 * Name of the current level
	 * @type {String}
	 */
	this.levelName = '';

	this.player = null;

	this.loader = new Loader(game);


	/*
	VARIABLES POUR LES VIES
	 */
	//nombre de vies = 3
	this.nbr_vies = 3;
	//intialisation des 3 coeurs de vie (pour les sprites)
	this.vie1;
	this.vie2;
	this.vie3;

	this.damageCounter = 0;

	/**
	 * Variables pour les statistiques
	 */
	this.stats = {};
	this.statistiques = new Statistiques();
	this.panneau_stats_afficher = true;
	this.stats_label = null;

	this.entites = new movingEntities(this.map);

	/**
	 * pas de this. pour ces variables car nous ne savons pas pourquoi cela ne marche pas avec...
	 * @type {Boolean}
	 */
	left = false;
	right = false;
	up = false;
	down = false;

	this.score = 0;
	this.scoreText = '';

	this.counter = 0;
	this.counting = true;


	this.cursors = null;

	//this.wkey;

};

Community.Play.prototype = {



	init: function (level) {
		this.levelName = level;

		this.score = 0;
		this.counter = 0;
		this.counting = true;

		this.map = {};
	},


	preload: function () {
		this.game.input.mouse.capture = true;
		console.log(this.levelName);
		this.game.load.text('data', 'assets/level1.json');
	},

	create: function () {

		//this.wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

		// Game world size & background
		this.game.add.tileSprite(0, 0, 1600, 1200, 'sky');
		this.game.world.setBounds(0, 0, 1600, 600);

		//  We're going to be using physics, so enable the Arcade Physics system
	    this.game.physics.startSystem(Phaser.Physics.ARCADE);

	    //  A simple background for our game
	    this.game.add.sprite(0, 0, 'sky');
	     /**
         * Génération du niveau depuis un json ou le localStorage
         * Envois des différents groupe pour la gestion des différents blocs
         */
        this.map = this.loader.load(this.map, this.game);

        //chargement des entites
        this.entites.load(this.map);

		//Ajout des 3 vies
        this.vie1 = this.game.add.sprite(550, 50, 'firstaid');
        this.vie1.scale.setTo(0.5, 0.5);
        this.vie1.fixedToCamera = true;
        this.vie2 = this.game.add.sprite(570, 50, 'firstaid');
        this.vie2.scale.setTo(0.5, 0.5);
        this.vie2.fixedToCamera = true;
        this.vie3 = this.game.add.sprite(590, 50, 'firstaid');
        this.vie3.scale.setTo(0.5, 0.5);
        this.vie3.fixedToCamera = true;

        // The player and its settings
        if('boost_right' in this.map){
            this.player = this.game.add.sprite(this.map['boost_right'].children[0].x, this.map['boost_right'].children[0].y - 20, 'dude');
        }else{
            this.player = this.game.add.sprite(32, this.game.world.height - 300, 'dude');
        }

        //  We need to enable physics on the player
	    this.game.physics.arcade.enable(this.player);

	    //  Player physics properties. Give the little guy a slight bounce.
	    this.player.body.bounce.y = 0.2;
	    this.player.body.gravity.y = 600;
	    this.player.body.collideWorldBounds = true; //desactiver pour permettre de sortir de l'ecran

	    //  Our two animations, walking left and right.
	    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
	    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

	    //  We will enable physics for any star that is created in this group
	    //stars.enableBody = true;
	    this.player.inputEnabled = true;
	    this.player.input.enableDrag();
        this.player.scale.setTo(0.8, 0.8);

        if(this.map['gameplay'] == 'score'){
            this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
            this.scoreText.fixedToCamera = true;
        } 

	    //  Our controls.
	    this.cursors = this.game.input.keyboard.createCursorKeys();


	    /**
	     * Creation of a camera following the player
	     */
	    this.game.camera.follow(this.player);

	    /* boutons */
        buttonLeft = this.game.add.button(0, this.game.world.height - 100, 'movable');
        buttonLeft.fixedToCamera = true;
        buttonLeft.events.onInputDown.add(function(){left = true;});
        buttonLeft.events.onInputUp.add(function(){left = false;});

        buttonRight = this.game.add.button(100, this.game.world.height - 100, 'movable');
        buttonRight.fixedToCamera = true;
        buttonRight.events.onInputDown.add(function(){right = true;});
        buttonRight.events.onInputUp.add(function(){right = false;});

        buttonUp = this.game.add.button(700, this.game.world.height - 100, 'movable');
        buttonUp.fixedToCamera = true;
        buttonUp.events.onInputDown.add(function(){up = true;});
        buttonUp.events.onInputUp.add(function(){up = false;});   
        
        
        // bouton de retour.
        buttonBack = this.game.add.button(750, 20, 'backSprite', this.backToMenu);
        buttonBack.scale.setTo(0.5, 0.5);
        buttonBack.fixedToCamera = true;
        
        pauseLabel = this.game.add.text(400, this.game.world.height - 50, 'PAUSE', { font: '25px Arial', fill: '#ffffff' });
        pauseLabel.inputEnabled = true;
        pauseLabel.events.onInputUp.add(function () {this.game.paused = true});
        pauseLabel.fixedToCamera = true;

        this.game.input.onDown.add(this.unPause, self);

        this.timer = this.game.time.create(false);
        this.timer.loop(Phaser.Timer.SECOND, this.updateTimer, this);
        this.timer.start();
        
        this.timeLabel = this.game.add.text(400, 50, '0', { font: '25px Arial', fill: '#ffffff' });
        this.timeLabel.fixedToCamera = true;

        /**
         * Initialisation des stats
         */
        //text des stats
        this.stats_label = this.game.add.text(100, 100, '', { font: '25px Arial', fill: '#ffffff' });
        this.stats_label.fixedToCamera = true; 

        this.statistiques.load();
        this.statistiques.UP("maps_played", 1);
        //console.log(this.game);
        // bouton des statistiques
        buttonStats = this.game.add.button(650, 20, 'StatsSprite', this.displayStats);
        buttonStats.scale.setTo(0.5, 0.5);
        buttonStats.fixedToCamera = true;
          

	},

	update: function () {

		this.timeLabel.setText('' + this.counter);

		/**
         * collide
         */
        if('ground' in this.map) {
            this.game.physics.arcade.collide(this.player, this.map['ground']);
        }
        if('ground_snow' in this.map) {
            this.game.physics.arcade.collide(this.player, this.map['ground_snow']);
        }
        if('movable' in this.map) {
            this.game.physics.arcade.collide(this.player, this.map['movable']);
            this.game.physics.arcade.collide(this.map['movable'],  this.map['movable']);
        }
        if('ground' in this.map && 'movable' in this.map){
            this.game.physics.arcade.collide(this.map['ground'], this.map['movable']);            
        }
        if('ground_snow' in this.map && 'movable' in this.map){
            this.game.physics.arcade.collide(this.map['ground_snow'], this.map['movable']);
        }

        /**
         * overlaps
         */
        if('lava' in this.map){
            this.game.physics.arcade.overlap(this.player, this.map['lava'], this.damage, null, this);
        }
        if('boost_left' in this.map && this.map['gameplay'] == 'point'){
            this.game.physics.arcade.overlap(this.player, this.map['boost_left'], this.victory, null, this);
        }
        if('star' in this.map && this.map['gameplay'] == 'score'){
            this.game.physics.arcade.overlap(this.player, this.map['star'], this.collectStar, null, this);
        }
        if('ladder' in this.map){
            this.game.physics.arcade.overlap(this.player, this.map['ladder'], this.lift, null, this);
        }
        if('fantome' in this.map){
            this.game.physics.arcade.overlap(this.player, this.map['fantome'], this.damage, null, this);
        }
        
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown || left)
	    {
	        //  Move to the left
	        this.player.body.velocity.x = -150;

	        this.player.animations.play('left');
	    }
	    else if (this.cursors.right.isDown || right)
	    {
	        //  Move to the right
	        this.player.body.velocity.x = 150;

	        this.player.animations.play('right');
	    }
	    else
	    {
	        //  Stand still
	        this.player.animations.stop();

	        this.player.frame = 4;
	    }
        
	    //  Allow the player to jump if they are touching the ground.
	    if ((this.cursors.up.isDown || up) && this.player.body.touching.down)
	    {
	        this.player.body.velocity.y = -350;
            this.statistiques.UP("jumps", 1);
	    }

	    //comptage de la distance parcourue par je joueur
        this.statistiques.distance_manager(this.player.body.x, this.player.body.y);
        //comptage du temps passé
        this.statistiques.time_manager();
        this.entites.move(this.map, this.player);



	},

	pause: function () {

	},

	unPause: function () {

		if(this.game.paused == true) {
            this.game.paused = false;
        } 	

    },

	collectStar: function (player, star) {

		star.kill();

		this.score += 10;
		this.scoreText.text = 'score: ' + this.score;

		if ( this.score > 100 ) {
			this.victory();
		}

	},

	victory: function () {

		var restartLabel = this.game.add.text(80, this.game.world.height - 500, '', { font: '25px Arial', fill: '#ffffff' });

    	this.counting = false;

    	restartLabel.setText("You Win ! ");
    	restartLabel.fixedToCamera = true;

	},

	damage: function () {

		if (this.damageCounter >20){
        this.nbr_vies = this.nbr_vies - 1;
        this.damageCounter = 0;
        if (this.nbr_vies == 2){
            //console.log("vie 1 perdue");
            this.vie1.kill();
            this.statistiques.UP("lost_lives", 1);
        }
        else if (this.nbr_vies == 1){
            //console.log("vie 2 perdue");
            this.vie2.kill();
            this.statistiques.UP("lost_lives", 1);
        }
        else if (this.nbr_vies == 0)
        {
            //console.log("vie 3 perdue");
            this.vie3.kill();
            this.statistiques.UP("lost_lives", 1);
        }
        else{
            this.defeat();
        }


    }
    else
    {
        this.damageCounter++;
    }

	},

	defeat: function () {

		
	        var defeatLabel = this.game.add.text(80, this.game.world.height - 500, 'YOU LOOSE !');
	        defeatLabel.fixedToCamera = true;
	        this.player.kill();
	        this.counting = false;
	        this.defeatCounter = 0;
	        this.statistiques.UP("game_overs", 1);
	   

	},

	lift: function () {

		this.player.body.velocity.y = -120;

	},

	backToMenu: function () {

		this.score = 0;
		this.counter = 0;
		this.counting = true;

		//this.map = {};

		this.game.state.start('Menu');

	},

	updateTimer: function () {

		if ( this.counting ) {
			this.counter ++;
		}

	},
	
	displayStats: function () {
		//afficher le panneau
		
		var ici = this.parent.game.state.states.Play;
	    //console.log(ici.stats_label);
	    if (ici.panneau_stats_afficher){
	    	
	        //var defeatLabel = game.add.text(80, game.world.height - 500, "game overs : " + statistiques.get_str("game_overs"));
	        ici.panneau_stats_afficher = false;
	        ici.stats_label.setText(ici.statistiques.allToString());
	        
	    }
	    //supprimer le panneau
	    else{
	        ici.panneau_stats_afficher = true;
	        ici.stats_label.setText("");
	    }
	}
	


};