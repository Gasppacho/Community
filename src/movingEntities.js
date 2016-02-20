function movingEntities(map){ //classe des stats de jeu
    //une map qui contient les entités par defaut
    var corps_sprite;
    this.entities = map;

}

/**
 *  
 *  ///NOUVEAU CODE DES ENTITES
 *  //last edit : Louis
 *
 * Permet de controler des sprites avec :
 *     -des IA 
 *     -gestion des points de vie 
 *     -gestion des attaques
 *  
 *  
 */
//blesse l'entité (barre de vie interne)
movingEntities.prototype.damage = function(key, amount){
    this.entity[key].vie -= amount;
    if (this.entity[key].vie <= 0){
      this.die(key);
    }
    return;
}

movingEntities.prototype.get = function(key){
    return this.entities[key];
}


//tue l'entité correspondant a la clef
movingEntities.prototype.die = function(key){
    this.entity[key].sprite.body.kill(); //detruit  le sprite
    delete entities[key]; //detruit l'entitée dans la map
    return;
}

//met a jour les coordonnées / la poussée de chaque entité
movingEntities.prototype.move_old = function(game, player){
    for (var key in this.entities) { //parcours de toutes les entités clef par clef
      if (this.entities.hasOwnProperty(key)) { //si une clef est definie, alors :
       //executer code de déplacement selon le type ici
       //si l'entité est un vautour
       if (key == "fantome"){
            //se deplacer sur 100 autour du joueur, en restant dans le cadre de la map
            //si on est pas a plus de 100 après le joueur :
            if (this.entities[key].sprite.body.x < player.body.x /*|| this.entities[key].sprite.body.x > player.body.x - 100*/){
              this.entities[key].sprite.body.velocity.x = 25; 
            }
            else if(this.entities[key].sprite.body.x > player.body.x){
              this.entities[key].sprite.body.velocity.x = -25;
            }


            if (this.entities[key].sprite.body.y < player.body.y /*|| this.entities[key].sprite.body.x > player.body.x - 100*/){
              this.entities[key].sprite.body.velocity.y = 25; 
            }
            else if(this.entities[key].sprite.body.y > player.body.y){
              this.entities[key].sprite.body.velocity.y = -25;
            }

       }
      }
    }
    return;
}
//fonction de chargement de toutes les entités depuis mapLoader
movingEntities.prototype.load_old = function(type, pos_x, pos_y, game){
    //!\ faire le lien dans  mapLoader pour prendre en compte les creatures /!\
    //puis charger les attributs ici
    var sprite = game.add.group();
    var buffer = sprite.create(pos_x, pos_x, 'ghost');
        //this.entities[type].vie = 100;
    //this.entities[type].sprite = game.add.sprite(pos_x, pos_y, 'ghost');
    game.physics.arcade.enable(sprite);
    buffer.body.bounce.y = 0.2;
    //this.entities[type].sprite.body.gravity.y = 100;
    buffer.body.collideWorldBounds = true;
    //this.entities[type].sprite.body = game.add.group();
    this.entities[type] = {
    "type" : type,
    "vie" : 100,
     "sprite" :  buffer
    };
    //this.entities[type].enableBody = true;
    //console.log(this.entities[type].sprite);
    

    return game;

}   


movingEntities.prototype.load = function(map){
  
  for (var key in map) { //parcours de toutes les entités clef par clef
      if (map.hasOwnProperty(key)) { //si une clef est definie, alors :
       //executer code de déplacement selon le type ici
       //si l'entité est un vautour
       if (key == "fantome"){
        var i = 0;
        
        while(map[key].children[i] != null){ //parcours de tous les enfant du groupe
          map[key].children[i].body.immovable = false;
          map[key].children[i].body.collideWorldBounds = true;
          console.log("HELLO");
          //iteration dans la liste des enfants
          i++;
        }
            

       }
      }
    }
    return;

}

movingEntities.prototype.move = function(map, player){
    for (var key in map) { //parcours de toutes les entités clef par clef
      if (map.hasOwnProperty(key)) { //si une clef est definie, alors :
       //executer code de déplacement selon le type ici
       //si l'entité est un vautour
       if (key == "fantome"){
        var i = 0;
        
        while(map[key].children[i] != null){ //parcours de tous les enfant du groupe
            //se deplacer sur 100 autour du joueur, en restant dans le cadre de la map
            //si on est pas a plus de 100 après le joueur :
            if (map[key].children[i].body.x < player.body.x /*|| this.entities[key].sprite.body.x > player.body.x - 100*/){
              map[key].children[i].body.velocity.x = 25; 
            }
            else if(map[key].children[i].body.x > player.body.x){
              map[key].children[i].body.velocity.x = -25;
            }


            if (map[key].children[i].body.y < player.body.y /*|| this.entities[key].sprite.body.x > player.body.x - 100*/){
              map[key].children[i].body.velocity.y = 25; 
            }
            else if(map[key].children[i].body.y > player.body.y){
              map[key].children[i].body.velocity.y = -25;
            }
          //iteration dans la liste des enfants
          i++;
        }


       }
      }
    }
    return;
}