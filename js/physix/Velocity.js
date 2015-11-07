Community.Velocity = function(player){
	this.x = x ;

	var self = this; //wtf?

	var vitesseprec = player.body.velocity.x;
	var delta = 0;
	
};

// Restore constructor
Community.Velocity.prototype.constructor = Community.Velocity;

// Prototype : method
Community.Velocity.prototype = {

	//Calcul de l'acceleration du personnage
	gforce: function() { 
		//calcul de l'acceleration
		var delta = Math.abs(player.body.velocity.x) - Math.abs(vitesseprec);
		//MAJ de vitesseprec pour le prochain appel
		vitesseprec = player.body.velocity.x;
		//retour de l'acceleration
		return delta;

	}



};

/**
 * plugin :
 *
 * installer package control
 * JSFormat
 * DocBlockr
 * 
 */
