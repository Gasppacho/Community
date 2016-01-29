var player;
var platforms;
var line1;
var left = false;
var right = false;
var up = false;
var down = false;
var currentBloc = 'ground';
var saver = new MapSaver();
var cursors;
var id = 0; //identifiant du bloc choisi
var idf = 0; //identifiant de l'effet choisi
var bloc_preview; //bloc de previsiualisation dans le menu de selection
/*var liste_blocs = [ //liste des blocs pouvant être placés
'boost_left',
'boost_right',
'checkpoint_empty',
'checkpoint_full',
'diamond',
'firstaid',
'gravity_inverser',
'ground',
'ground_snow',
'instable',
'ladder',
'lava',
'movable',
'star'
];*/
var liste_effets = [
"gravity",
"sticky"
];

var unPress = true;

//Ajoute le bloc selectionné au niveau
function addCube() {
    console.log("addCube");
    /**
     *  Envois de l'élément à la sauvegarde
     */
    saver.addElement(player.position.x, player.position.y, currentBloc, "sticky");
    // ici hicham doit faire sa requete vers la base de donnée
    
    /**
     *  Ajout de l'élément à l'inteface d'édition pour visualisation
     *  Adaptation de la taille du sprite avec SCALE.
     */
    cubes = game.add.sprite(player.position.x, player.position.y, currentBloc);
    cubes.scale.setTo(0.5, 0.5);
}

//Sauvegarde du niveau
function save() {
    saver.save();

}

function selectGravity(nom_du_bloc) {
    //alterne entre 0 et 1 à chaque run.
        if (nom_du_bloc == "movable")
        {
            idf=0;
        }
        else
        {
            idf=1;
        }
        
        MenuText.text=liste_effets[idf];
        return;
    
    
    
}

var editState = {

	create: function() {
		var cubes = game.add.group();

		// Game world size & background
		game.add.tileSprite(0, 0, 1600, 1200, 'sky');
		game.world.setBounds(0, 0, 1600, 640);
        
        
        
		/**
		 * Adding line to the game for visibility 
		 */var graphics = game.add.graphics(0, 0);
		var horizontal = []; 
   		for(var j = 0; j < 50; j++){
             for(var i = 0; i < 50; i ++){
           	 	//horizontal[i] = game.add.sprite(0, game.world.height - (32 * i), 'h', 0);
                graphics.lineStyle(1, 0x000000, 1);
                graphics.drawRect(32*i, j*32, 32, 0.5);
                graphics.drawRect(32*i, j*32, 0.5, 32);
           	 }
        }
	 

        // set a fill and line style

        
        // draw a shape
        
	    // The player and its settings
	    player = game.add.sprite(320, 480, 'cursor');
        player.scale.setTo(0.5,0.5);

	    //  We need to enable physics on the player
	    game.physics.arcade.enable(player);
	    player.body.collideWorldBounds = true;
        
        /**
	     * Creation of a camera following the player
	     */
	    game.camera.follow(player);

        
        /**
         *  Joystick and button creation
         */
        //if (!this.game.device.desktop){
            buttonAction = game.add.button(700, game.world.height - 200, 'movable', addCube);
            //buttonAction.scale.setTo(0.5, 0.5);
            buttonAction.fixedToCamera = true;

            buttonLeft = game.add.button(0, game.world.height - 150, 'movable', left);
            buttonLeft.scale.setTo(0.5, 0.5);
            buttonLeft.fixedToCamera = true;
            buttonLeft.events.onInputDown.add(function(){left = true;});
            buttonLeft.events.onInputUp.add(function(){left = false;});

            buttonRight = game.add.button(100, game.world.height - 150, 'movable', right);
            buttonRight.scale.setTo(0.5, 0.5);
            buttonRight.fixedToCamera = true;
            buttonRight.events.onInputDown.add(function(){right = true;});
            buttonRight.events.onInputUp.add(function(){right = false;});

            buttonUp = game.add.button(50, game.world.height - 180, 'movable', up);
            buttonUp.scale.setTo(0.5, 0.5);
            buttonUp.fixedToCamera = true;
            buttonUp.events.onInputDown.add(function(){up = true;});
            buttonUp.events.onInputUp.add(function(){up = false;});

            buttonDown = game.add.button(50, game.world.height - 120, 'movable', down);
            buttonDown.scale.setTo(0.5, 0.5);
            buttonDown.fixedToCamera = true; 
            buttonDown.events.onInputDown.add(function(){down = true;});
            buttonDown.events.onInputUp.add(function(){down = false;});
        
            // bouton de retour.
            buttonBack = game.add.button(750, 20, 'backSprite', backToMenu);
            buttonBack.scale.setTo(0.5, 0.5);
            buttonBack.fixedToCamera = true;

            buttonSave = game.add.button(750, 90, 'saveSprite');
            buttonSave.scale.setTo(0.5, 0.5);
            buttonSave.fixedToCamera = true;
            buttonSave.events.onInputDown.add(function(){save();});

            buttonPal1= game.add.button(650, 20, 'lava');
            buttonPal1.scale.setTo(0.5, 0.5);
            buttonPal1.fixedToCamera = true;
            buttonPal1.events.onInputDown.add(function(){currentBloc = 'lava';});

            buttonPal2 = game.add.button(700, 20, 'ground');
            buttonPal2.scale.setTo(0.5, 0.5);
            buttonPal2.fixedToCamera = true;
            buttonPal2.events.onInputDown.add(function(){currentBloc = 'ground';});

            buttonPal3 = game.add.button(600, 20, 'ground_snow');
            buttonPal3.scale.setTo(0.5, 0.5);
            buttonPal3.fixedToCamera = true;
            buttonPal3.events.onInputDown.add(function(){currentBloc = 'ground_snow';});

            buttonPal4 = game.add.button(550, 20, 'star');
            buttonPal4.scale.setTo(0.5, 0.5);
            buttonPal4.fixedToCamera = true;
            buttonPal4.events.onInputDown.add(function(){currentBloc = 'star';});

            buttonPal5 = game.add.button(500, 20, 'instable');
            buttonPal5.scale.setTo(0.5, 0.5);
            buttonPal5.fixedToCamera = true;
            buttonPal5.events.onInputDown.add(function(){currentBloc = 'instable';});

            buttonPal6 = game.add.button(450, 20, 'diamond');
            buttonPal6.scale.setTo(0.5, 0.5);
            buttonPal6.fixedToCamera = true;
            buttonPal6.events.onInputDown.add(function(){currentBloc = 'diamond';});

            buttonPal7 = game.add.button(400, 20, 'ladder');
            buttonPal7.scale.setTo(0.5, 0.5);
            buttonPal7.fixedToCamera = true;
            buttonPal7.events.onInputDown.add(function(){currentBloc = 'ladder';});
          

            buttonPal9 = game.add.button(350, 20, 'boost_left');
            buttonPal9.scale.setTo(0.5, 0.5);
            buttonPal9.fixedToCamera = true;
            buttonPal9.events.onInputDown.add(function(){currentBloc = 'boost_left';});

            buttonPal10 = game.add.button(300, 20, 'boost_right');
            buttonPal10.scale.setTo(0.5, 0.5);
            buttonPal10.fixedToCamera = true;
            buttonPal10.events.onInputDown.add(function(){currentBloc = 'boost_right';});

            buttonPal11 = game.add.button(250, 20, 'gravity_inverser');
            buttonPal11.scale.setTo(0.5, 0.5);
            buttonPal11.fixedToCamera = true;
            buttonPal11.events.onInputDown.add(function(){currentBloc = 'gravity_inverser';});

            buttonPal12 = game.add.button(200, 20, 'firstaid');
            buttonPal12.scale.setTo(0.5, 0.5);
            buttonPal12.fixedToCamera = true;
            buttonPal12.events.onInputDown.add(function(){currentBloc = 'firstaid';});

            buttonPal13 = game.add.button(150, 20, 'checkpoint_empty');
            buttonPal13.scale.setTo(0.5, 0.5);
            buttonPal13.fixedToCamera = true;
            buttonPal13.events.onInputDown.add(function(){currentBloc = 'checkpoint_empty';});

            buttonPal14 = game.add.button(100, 20, 'checkpoint_full');
            buttonPal14.scale.setTo(0.5, 0.5);
            buttonPal14.fixedToCamera = true;
            buttonPal14.events.onInputDown.add(function(){currentBloc = 'checkpoint_full';});

        //}
        
        
        /**
         *  Enable keyboard
         */
	    cursors = game.input.keyboard.createCursorKeys();

	    /**
	     * Biding q key to place a block
	     */
	    qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        
        /**
	     * Biding s key to save level
	     */
	    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        
        //touche pour selectioner le bloc suivant
        plusKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        
        //touche pour selectioner le bloc precedent
        lessKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        
        //touche pour activer la gravité (INACTIF)
	    //gKey = game.input.keyboard.addKey(Phaser.Keyboard.G);
        
        //Menu de selection de bloc
        //declaration du label
       // MenuText = game.add.text(player.position.x + 32, player.position.y + 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        //MenuText.text='Bloc : '; 
        //declaration du block de previsualisation par defaut
        //bloc_preview = game.add.sprite(player.position.x + 100 + 16, player.position.y+16, liste_blocs[id]); 
        //mise a l'echelle
        //bloc_preview.scale.setTo(0.5, 0.5); 


	},

	update: function() {

        /**
         *  Gestion des touches clavier
         */
        //if (this.game.device.desktop){
            if (cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp && qKey.isUp && plusKey.isUp && lessKey.isUp){
			unPress = true;
            }

            if (cursors.left.isDown && unPress == true)
            {
                unPress = false;
                player.body.position.x -= 32;
            }
            if(cursors.right.isDown && unPress == true)
            {
                unPress = false;
                player.body.position.x += 32;
            }	    
            else if (cursors.up.isDown && unPress == true)
            {
                unPress = false;
                player.body.position.y -= 32;
            }
            else if (cursors.down.isDown && unPress == true)
            {
                unPress = false;
                player.body.position.y += 32;
            }
            else if (qKey.isDown && unPress == true){
                unPress = false;
                addCube();
            }
            else if (sKey.isDown && unPress == true){
                unPress = false;
                save();
            }
            /*else if (plusKey.isDown && unPress == true){
                unPress = false;
                selectCube("prec");
                selectGravity(liste_blocs[id]);
            }
            else if (lessKey.isDown && unPress == true){
                unPress = false;
                selectCube("suivant");
                selectGravity(liste_blocs[id]);
            }*/
        //}else{
            if(left){
                player.body.velocity.x = -150;
            }else if(right){
                player.body.velocity.x = 150;
            }else if(up){
                player.body.velocity.y = -150;
            }else if(down){
                player.body.velocity.y = 150;
            }else{
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
            }
        //}
		
        
        
        //MAJ de la position du menu de selection des blocs
       /* MenuText.x = player.position.x + 32;
        MenuText.y = player.position.y + 16;
        bloc_preview.x=player.position.x + 100 + 16;
        bloc_preview.y=player.position.y+16;*/
         

	},

};