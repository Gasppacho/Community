function movingEntities(game){ //classe des stats de jeu
    //une map qui contient les entités par defaut
    this.entities = {
    
    "vautour" : {"type" : "vautour", "vie" : 100, "corps" : var corps_sprite = game.add.sprite(64, game.world.height - 300, 'dude')},
    "vautour" : {"type" : "vautour", "vie" : 100, "corps" : var corps_sprite = game.add.sprite(128, game.world.height - 300, 'dude')}
    };

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
    return;
}

//tue l'entité correspondant a la clef
movingEntities.prototype.die = function(key, sprite_entity){
    sprite_entity.kill(); //detruit  le sprite
    delete entities[key];
    return;
}

//met a jour les coordonnées / la poussée de chaque entité
movingEntities.prototype.move = function(){
    for (var key in this.entities) { //parcours de toutes les entités clef par clef
      if (this.entities.hasOwnProperty(key)) { //si une clef est definie, alors :
       //executer code de déplacement selon le type ici
       //si l'entité est un vautour
       if (key == "vautour"){
            //se deplacer sur 100 autour du joueur, en restant dans le cadre de la map
            
       }
      }
    }
    return;
}
//fonction de chargement de toutes les entités depuis mapLoader
movingEntities.prototype.load = function(type, pos_x, pos_y, vie){
    //!\ faire le lien dans  mapLoader pour prendre en compte les creatures /!\
    //puis charger les attributs ici
    this.entities[type].type = type;
    this.entities[type].x = pos_x;
    this.entities[type].y = pos_y;
    this.entities[type].vie = vie;

}   
