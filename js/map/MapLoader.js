function MapLoader() {
    this.map = {};
    this.str;
}

/**
 *  
 *  ///NOUVEAU CODE DE CHARGEMENT
 *  //last edit : Louis
 *  
 *  
 */

//fonction d'attribution des propriétés d'un bloc
function apply_effect(bloc, nom, entites, game){
   
    if (nom == "movable"){
        //on peut le deplacer
        bloc.body.immovable = false;
        //il ne peut pas tomber hors de l'écran
        bloc.body.collideWorldBounds = true;
        //active la gravité 
        bloc.body.gravity.y = 300;
        //active la friction
        bloc.body.drag.x = 100;
    }
    else if (nom == "fantome"){
        game = entites.load(nom, bloc.body.x, bloc.body.y, game);
        delete this.map["fantome"];
    }
    else
    {
        //fixe definitivement les blocs
        bloc.body.immovable = true;
    }
    return game;
}
//fonction de chargement de la map
MapLoader.prototype.load = function(game, map, entites) {

       //chargement du json 
       var temp = JSON.parse(game.cache.getText('data'));
       
       //nouveau tableau
       var list = new Array();
       //passage du contenu du JSON au tableau
       list = temp.elements;
       //taille de la map (en blocs)
       var size = parseInt(temp.size);

       //declaration d'un iterateur
       var i = 0;
       while(i < size){ //tant qu'il reste des blocs :

            var buffer;
                //creer une clef du nom du bloc et y inserer une reference vers un groupe de plateformes aux coords x, y, et contenant le type
            if(list[i].type in map){
                buffer = map[list[i].type].create(parseInt(list[i].x), parseInt(list[i].y), list[i].type);
                game = apply_effect(buffer, list[i].type, entites, game);
            }else {
                map[list[i].type] = game.add.group();
                map[list[i].type].enableBody = true;
                buffer = map[list[i].type].create(parseInt(list[i].x), parseInt(list[i].y), list[i].type);
                game = apply_effect(buffer, list[i].type, entites, game);
            }
                
                
                //mise a l'echelle des sprites
                buffer.scale.setTo(0.5, 0.5);
            //iteration : bloc suivant.
            i++;
        }
        
    //retourne la nouvelle version de game contenant une map chargée
    return game;
};