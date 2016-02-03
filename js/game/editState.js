var player;
var platforms;
var line1;
var left = false;
var right = false;
var up = false;
var down = false;
var camera;
var currentBloc = 'ground';
var saver = new MapSaver();
var cursors;
var id = 0; //identifiant du bloc choisi
var idf = 0; //identifiant de l'effet choisi
var bloc_preview; //bloc de previsiualisation dans le menu de selection
/*
var liste_blocs = [ //liste des blocs pouvant être placés
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
];
*/
var liste_blocs = new Array(); 

var liste_boutons_menu_blocs = [ //liste des blocs dans le menu de selection (10 affichés d'un coup)
'bloc1',
'bloc2',
'bloc3',
'bloc4',
'bloc5'
];

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
    saver.addElement(player.position.x, player.position.y, liste_blocs[id+currentBloc], "sticky");
    // ici hicham doit faire sa requete vers la base de donnée
    
    /**
     *  Ajout de l'élément à l'inteface d'édition pour visualisation
     *  Adaptation de la taille du sprite avec SCALE.
     */
    cubes = game.add.sprite(player.position.x, player.position.y, liste_blocs[id+currentBloc]);
    cubes.scale.setTo(0.5, 0.5);
}


function overlay(blocID) {
    
    var x_cadre = liste_boutons_menu_blocs[blocID].position.x + game.world.x; //releve du x
    var y_cadre = liste_boutons_menu_blocs[blocID].position.y + game.world.y; //releve du y
    cadre.kill();
    cadre = game.add.sprite(x_cadre, y_cadre, 'cadre');
    cadre.fixedToCamera = true;
    cadre.scale.setTo(0.5, 0.5);
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

function menu_liste_blocs(offset) { //MAJ du menu de selection des blocs selon un offset "gauche" ou "droite"
    //alterne entre 0 et 1 à chaque run.
    //
    
    cptmax = liste_boutons_menu_blocs.length; // nombre de blocks dans le menu de selection
    idmax = liste_blocs.length - cptmax;

        if (offset == 'gauche') //ajout d'un bloc a gauche
        {
            if (id <= 0) //limite inferieure
            {
                //id = 0; //ne rien faire ?
            }
            else
            {
                id= id - 5; //decalage a gauche
            }
        }
        else //ajout d'un bloc a droite
        {
            if (id >= idmax) //limite superieure
            {
                //id = idmax; //ne rien faire ?
            }
            else
            {
                id = id + 5; //decalage a droite
            }
        }
        
        //MAJ du menu des blocs
        //id = identifiant du premier bloc affiché
        //il faut afficher les 9 autres blocs suivants pour completer le menu
        for (cpt = 0; cpt < 5; cpt++)
        {
            //cpt est le compteur de blocs fixes (10)
            //id est le compteur des blocs a decaler
            liste_boutons_menu_blocs[cpt].loadTexture(liste_blocs[id+cpt]);
        }
        
        return;
    
    
    
}

var editState = {

	create: function() {
		var cubes = game.add.group();

        //chargement du JSON
        var temp = JSON.parse(game.cache.getText('data'));
		liste_blocs = temp.liste_blocs;
        console.log(temp.liste_blocs[0]);

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
	    camera = game.camera.follow(player);

        
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

            //BOUTONS DE POSE DE BLOCS
            //Block le plus à droite : fleche droite
            buttonPal1= game.add.button(400, 20, 'droite'); //remplacer par sprite fleche droite
            buttonPal1.scale.setTo(0.2, 0.2); // mise a l'echelle
            buttonPal1.fixedToCamera = true; //fixe par rapport a la camera
            buttonPal1.events.onInputDown.add(function(){menu_liste_blocs('droite');}); //droite : 1 block vers la droite
            /*
            buttonPal2 = game.add.button(700, 20, 'ground');
            buttonPal2.scale.setTo(0.5, 0.5);
            buttonPal2.fixedToCamera = true;
            buttonPal2.events.onInputDown.add(function(){currentBloc = 'ground';});
            bloc1 = buttonPal2; //ajout a la liste des blocs du menu de selection
            */
           /*
            buttonPal3 = game.add.button(600, 20, 'ground_snow'); //INIT SPRITE
            buttonPal3.scale.setTo(0.5, 0.5);
            buttonPal3.fixedToCamera = true;
            buttonPal3.events.onInputDown.add(function(){currentBloc = 9;overlay(currentBloc);});
            liste_boutons_menu_blocs[9] = buttonPal3; //ajout a la liste des blocs du menu de selection

            buttonPal4 = game.add.button(550, 20, 'star'); //INIT SPRITE
            buttonPal4.scale.setTo(0.5, 0.5);
            buttonPal4.fixedToCamera = true;
            buttonPal4.events.onInputDown.add(function(){currentBloc = 8;overlay(currentBloc);});
            liste_boutons_menu_blocs[8] = buttonPal4; //ajout a la liste des blocs du menu de selection

            buttonPal5 = game.add.button(500, 20, 'instable'); //INIT SPRITE
            buttonPal5.scale.setTo(0.5, 0.5);
            buttonPal5.fixedToCamera = true;
            buttonPal5.events.onInputDown.add(function(){currentBloc = 7;overlay(currentBloc);});
            liste_boutons_menu_blocs[7] = buttonPal5; //ajout a la liste des blocs du menu de selection
            buttonPal6 = game.add.button(450, 20, 'diamond'); //INIT SPRITE
            buttonPal6.scale.setTo(0.5, 0.5);
            buttonPal6.fixedToCamera = true;
            buttonPal6.events.onInputDown.add(function(){currentBloc = 6;overlay(currentBloc);});
            liste_boutons_menu_blocs[6] = buttonPal6; //ajout a la liste des blocs du menu de selection
            

            buttonPal7 = game.add.button(400, 20, 'ladder'); //INIT SPRITE
            buttonPal7.scale.setTo(0.5, 0.5);
            buttonPal7.fixedToCamera = true;
            buttonPal7.events.onInputDown.add(function(){currentBloc = 5;overlay(currentBloc);});
            liste_boutons_menu_blocs[5] = buttonPal7; //ajout a la liste des blocs du menu de selection
          
            */
            buttonPal9 = game.add.button(350, 20, 'boost_left'); //INIT SPRITE
            buttonPal9.scale.setTo(0.5, 0.5);
            buttonPal9.fixedToCamera = true;
            buttonPal9.events.onInputDown.add(function(){currentBloc = 4;overlay(currentBloc);});
            liste_boutons_menu_blocs[4] = buttonPal9; //ajout a la liste des blocs du menu de selection
            cadre = game.add.sprite(150,20, 'cadre'); // INIT CADRE
            cadre.scale.setTo(0.5, 0.5);
            cadre.fixedToCamera = true;


            buttonPal10 = game.add.button(300, 20, 'boost_right'); //INIT SPRITE
            buttonPal10.scale.setTo(0.5, 0.5);
            buttonPal10.fixedToCamera = true;
            buttonPal10.events.onInputDown.add(function(){currentBloc = 3;overlay(currentBloc);});
            liste_boutons_menu_blocs[3] = buttonPal10; //ajout a la liste des blocs du menu de selection

            buttonPal11 = game.add.button(250, 20, 'gravity_inverser'); //INIT SPRITE
            buttonPal11.scale.setTo(0.5, 0.5);
            buttonPal11.fixedToCamera = true;
            buttonPal11.events.onInputDown.add(function(){currentBloc = 2;overlay(currentBloc);});
            liste_boutons_menu_blocs[2] = buttonPal11; //ajout a la liste des blocs du menu de selection

            buttonPal12 = game.add.button(200, 20, 'firstaid'); //INIT SPRITE
            buttonPal12.scale.setTo(0.5, 0.5);
            buttonPal12.fixedToCamera = true;
            buttonPal12.events.onInputDown.add(function(){currentBloc = 1;overlay(currentBloc);});
            liste_boutons_menu_blocs[1] = buttonPal12; //ajout a la liste des blocs du menu de selection

            buttonPal13 = game.add.button(150, 20, 'checkpoint_empty'); //INIT SPRITE
            buttonPal13.scale.setTo(0.5, 0.5);
            buttonPal13.fixedToCamera = true;
            buttonPal13.events.onInputDown.add(function(){currentBloc = 0; overlay(currentBloc);});
            liste_boutons_menu_blocs[0] = buttonPal13; //ajout a la liste des blocs du menu de selection

            //Bouton le plus à gauche  : Fleche gauche
            buttonPal14 = game.add.button(100, 20, 'gauche'); //à remplacer par un sprite de fleche
            buttonPal14.scale.setTo(0.2, 0.2); //reglache de l'echelle du sprite
            buttonPal14.fixedToCamera = true; //fixe par rapport à la camera
            buttonPal14.events.onInputDown.add(function(){menu_liste_blocs('gauche');}); //gauche : 1 block vers la gauche

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
        //
        //
        menu_liste_blocs(0);
        overlay(1);


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
            else if (plusKey.isDown && unPress == true){
                unPress = false;
                //+1 block a droite dans le menu bloc
                //
            }
            else if (lessKey.isDown && unPress == true){
                unPress = false;
                //+1 block a droite dans le menu bloc
                //
            }
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