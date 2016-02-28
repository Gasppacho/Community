function Statistiques(){ //classe des stats de jeu
    //une map qui contient les stats en clef
    this.stats = {
    
    "distance" : 0,
    "game_time" : 0,
    "maps_played" : 0,
    "jumps" : 0,
    "maps_completed" : 0,
    "game_overs" : 0,
    "lost_lives" : 0,
    "medikits" : 0,
    };

    //dernieres positions connues du joueur
    this.lastX = 0; //derniere position x du joueur
    this.lastY = 0; //derniere position y du joueur
    
    //secondes depuis 1970 au moment du lancement (tps POSIX)
    
    var d = new Date();
    this.lastT = parseInt(d.getTime());
    

}

/**
 *  
 *  ///NOUVEAU CODE DE STATISTIQUES
 *  //last edit : Louis
 *
 * Il faut declarer statistiques au debut et faire stats.load pour charger les stats
 * depuis le localstorage.
 * Ensuite, on place des stats.UP("nom_de_la_stat", "nbr_de_points") pour augmenter les stats
 * La fonction save permet de sauvegarder toutes les stats d'un coup
 * La fonction up increment une stat et la save en mm temps
 * La fonction distance_manager gère la stat distance et MAJ le localStorage / la map state
 *  
 *  
 */

Statistiques.prototype.get_str = function(key){
    return this.stats[key];
}

Statistiques.prototype.allToString = function(key){
    var texte = "Statistiques\n";
    for (var key in this.stats) { //parcours de toutes les clefs de la map stats
      if (this.stats.hasOwnProperty(key)) { //si une clef est definie, alors :
                texte+= " " + key + " : "; //nom de la statistique
            if (key == "game_time"){
                var secondes = this.stats[key]*1;
                var heures = toHours(secondes);
                texte+=heures; //ajout de la valeur en heures
                //ajout de la legende
                texte+=" heures ";

                secondes = secondes - heures*3600;
                minutes = toMinutes(secondes);
                texte+= minutes; //ajout de la valeur en minutes
                //ajout de la legende
                texte+=" minutes ";
                secondes = (this.stats[key]*1) - (minutes * 60) - (heures * 3600);
                texte+=secondes + " secondes\n";
            }
            else if (key == "distance"){
                //ajout de la distance arrondie
                texte+=Math.floor(this.stats[key]);
                texte+=" blocs\n";
            }
            else{
                //texte+= " " + key + " : ";
                texte+=this.stats[key]+"\n";
            }
        
        }
    }
    return texte;
}

//sauvegarde des toutes statistiques dans le localstorage
Statistiques.prototype.save = function(){
    for (var key in this.stats) { //parcours de toutes les clefs de la map stats
      if (this.stats.hasOwnProperty(key)) { //si une clef est definie, alors :
        window.localStorage.setItem(key,this.stats[key]); //stocker la clef et sa valeur dans le local storage
      }
    }
}
//fonction de chargement de toute la map depuis le localstorage
Statistiques.prototype.load = function(){
    
    //console.log("Statistiques Locales : ");
    for (var key in this.stats) { //parcours de toutes les clefs de la map stats
        
        if (this.stats.hasOwnProperty(key)) { //si une clef est definie, alors :
        //recuperation d'une valeur par clef
        
        var temp = localStorage.getItem(key);
        var result = temp*1;
        //console.log(key + " -> " + temp);
        //cas de la valeur vide
            if(result == null || result == "Undefined" || isNaN(result) ) { //si y'a pas de resultat enregistré
               //console.log("modifiying...");
               localStorage.setItem(key, '0'); //mise a 0 dans le local storage
               var temp = localStorage.getItem(key); //charger la donnée dans result
               var result = temp*1;
            }
        this.stats[key] = result;
        }
        
    }
}

//incrementation de la valeur d'une statistique en particulier
//les statistiques ne baissent pas : pas de fonction de decrementation
Statistiques.prototype.UP = function(key, value){
    if (value == null || value == "Undefined"){
        return;
    }
    if (this.stats[key] == null){
        //message d'erreur en cas de mauvaise clef
        //console.log("Statistiques :  clef non reconnue" + key);
        return;
    }
    else
    {
        

        //recuperation de la valeur precedente et MAJ
        this.stats[key]= this.stats[key] + value;
        //formatage de value
        value = this.stats[key]; //stockage 
        value = Math.floor(this.stats[key]); //arrondi
        var value_str = value.toString(); //conversion en string
        //sauvegarde de cette stat
        //console.log("Key : " + key + " Value stored : " + value_str);
        localStorage.setItem(key,value_str);
        
    } 

}



//gere la statistique de la distance totale parcourue en fonction des coordonnées du joueur
Statistiques.prototype.distance_manager = function(pos_x, pos_y){
    if (this.lastX == 0){
        this.lastX = pos_x;
    }
    if (this.lastY == 0){
        this.lastY = pos_y;
    }
    var dx = pos_x - this.lastX;
    var dy = pos_y - this.lastY;

    dx = dx * dx;
    dy = dy * dy;
    if (dx < 1000 && dy <1000){//ne pas faire d'operations lourdes et quitter
        return;
    }
    else{ //MAJ des attributs et save des stats
        //MAJ des attributs
        this.lastX = pos_x;
        this.lastY = pos_y;
        //calcul de la distance
        var distance = Math.sqrt(dx + dy) / 100;
        //SAVE
        this.UP('distance', distance);
        return;
    }
    

}

//Gestion du temps de jeu 
Statistiques.prototype.time_manager = function(){

    //temps courant en secondes puis 1970
    var date_buffer = new Date(); //creation de Date
    var currT = parseInt(date_buffer.getTime()); //recuperation du POSIX
    //initialisation du last time en cas de preimere utilisation
    
    //difference et arrondi, remise en secondes
    var dT = Math.floor(parseFloat((currT*1) - (this.lastT*1)) / 1000);
    
    //qi ça fait pas longtemps qu'on a ajouté du temps (<1sec)
    if (dT < 1){
        return;
    }
    else //sinon ajouter du temps
    {
        //update de la stat
        //this.stats["game_time"] = this.stats["game_time"] + dT;
        this.lastT = date_buffer.getTime(); //update du temps 
        //console.log("dT : " + this.stats["game_time"]);
        this.UP("game_time", dT);
        return;
    }
    
    //MAJ du temps de jeu
    //this.UP('game_time', time);
    return;
    

}

//retourne les minutes
function toMinutes(secondes){
    return Math.floor(secondes/60);
}

//retourne les heures
function toHours(secondes){
    return Math.floor(secondes/3600);
}

//retourne les jours : cas de joueur extrême
function toDays(secondes){
    return Math.floor(toHours(secondes)/24);
}