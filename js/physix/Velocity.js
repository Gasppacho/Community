Community.Velocity = function(player){
	this.vitesseprec = player.body.velocity.x;
	
	
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

		//Le joueur est il vivant ? (conditions de mort par physique)
		isAlive: function() { 
		//Es que l'acceleration est supportable
		if (gforce()>400){
			return false;
		}
		//Si toutes les conditions ci dessus ont échoué, alors il est vivant
		else
		{
			return true;
		}


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
