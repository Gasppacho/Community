Community.Gravity = function(game){
	//verifier si ça marche ou s'il faut déclarer game.physics.startSystem(Phaser.Physics.ARCADE); avant
	this.gravity = game.physics.arcade.gravity.y;
	
	
};

// Restore constructor
Community.Velocity.prototype.constructor = Community.Velocity;

// Prototype : method
Community.Velocity.prototype = {

	//modifie la gravité en fonction de delta
	delta: function(nombre) { 
		//pas de protection contre la gravité negative : tests à faire
		gravity = gravity + nombre ;
		

	},

		//Fixe la valeur de la gravité
		set: function(nombre) { 
		//pas de protection contre la gravité negative : tests à faire
		gravity = nombre;
		
	}



};


