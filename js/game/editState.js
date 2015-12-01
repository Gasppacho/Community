var player;
var platforms;
var saver = new MapSaver();
var cursors;
var id = 0; //identifiant du bloc choisi
var idf = 0; //identifiant de l'effet choisi
var bloc_preview; //bloc de previsiualisation dans le menu de selection
var liste_blocs = [ //liste des blocs pouvant être placés
'boost_left',
'boost_right',
'checkpoint_empty',
'checkpoint_full',
//'cube',
'diamond',
'firstaid',
'gravity_inverser',
'ground',
'ground_snow',
//'horizontal',
'instable',
'ladder',
'lava',
'movable',
'star'
];
var liste_effets = [
"gravity",
"sticky"
];

var unPress = true;

//Ajoute le bloc selectionné au niveau
function addCube() {
    /**
     *  Envois de l'élément à la sauvegarde
     */
    saver.addElement(player.position.x, player.position.y + 16, liste_blocs[id], liste_effets[idf]);
    
    /**
     *  Ajout de l'élément à l'inteface d'édition pour visualisation
     *  Adaptation de la taille du sprite avec SCALE.
     */
    cubes = game.add.sprite(player.position.x, player.position.y + 16, liste_blocs[id]);
    cubes.scale.setTo(0.5, 0.5);
}

//Sauvegarde du niveau
function save() {
    saver.save();
}

//Selection du bloc à poser : A et Z
function selectCube(choix) {
    if (choix == "suivant" && id < liste_blocs.length){
        id++;
    }
    else if (choix == "prec" && id > 0) {
        id--;
    }
    
    bloc_preview.loadTexture(liste_blocs[id]);
}

function selectGravity() {
	//alterne entre 0 et 1 à chaque run.
    
        idf=1-idf;
        MenuText.text=liste_effets[idf];
        return;
    
    
    
}

var editState = {

	create: function() {
		var cubes = game.add.group();

		// Game world size & background
		game.add.tileSprite(0, 0, 1600, 1200, 'sky');
		game.world.setBounds(0, 0, 1600, 600);
        
        
		/**
		 * Adding line to the game for visibility 
		 */
		var horizontal = []; 
   		 for(var i = 0; i < 50; i ++){
       	 	horizontal[i] = game.add.sprite(0, game.world.height - (32 * i), 'h', 0);
       	 }
    
	    var vertical = [];
	    for(var j = 0; j < 50; j ++){
	        vertical[j] = game.add.sprite(32 * j, 0, 'v', 0);
	    }


	    // The player and its settings
	    player = game.add.sprite(32, 32, 'dude');

	    //  We need to enable physics on the player
	    game.physics.arcade.enable(player);
	    player.body.collideWorldBounds = true;
        
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

        gKey = game.input.keyboard.addKey(Phaser.Keyboard.G);
        
	    /**
	     * Creation of a camera following the player
	     */
	    game.camera.follow(player);
        
        //Menu de selection de bloc
        //declaration du label
        MenuText = game.add.text(player.position.x + 32, player.position.y + 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        //affichage par defaut
        MenuText.text='Bloc : '; 
        //declaration du block de previsualisation par defaut
        bloc_preview = game.add.sprite(player.position.x + 100 + 16, player.position.y+16, liste_blocs[id]); 
        //mise a l'echelle
        bloc_preview.scale.setTo(0.5, 0.5); 


	},

	update: function() {

        /**
         *  Gestion des touches clavier
         */
		if (cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp && qKey.isUp && plusKey.isUp && lessKey.isUp && gKey.isUp){
			unPress = true;
		}

	    if (cursors.left.isDown && unPress == true)
	    {
	    	unPress = false;
	        player.body.position.x -= 32;
	    }
	    else if(cursors.right.isDown && unPress == true)
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
        else if (plusKey.isDown && unPress == true){
            unPress = false;
            selectCube("prec");
        }
        else if (lessKey.isDown && unPress == true){
            unPress = false;
            selectCube("suivant");
        }
        else if (gKey.isDown && unPress == true){
            unPress = false;
            selectGravity("toggle");
        }
        
        
        //MAJ de la position du menu de selection des blocs
        MenuText.x = player.position.x + 32;
        MenuText.y = player.position.y + 16;
        bloc_preview.x=player.position.x + 100 + 16;
        bloc_preview.y=player.position.y+16;
         

	},

};