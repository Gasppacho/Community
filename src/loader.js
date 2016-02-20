Loader = function(game) {

	/**
	 * Array of key / value of evry kind of block by group
	 * @type {Object}
	 */
	this.map = {};

	/**
	 * local reference to the varaible game
	 * @type {[type]}
	 */
	this.game = game;

	/**
	 * array to store the json list
	 * @type {Array}
	 */
	this.list = new Array();

};

Loader.prototype.load = function(map, game) {
	//loading of the json
	var json = JSON.parse(this.game.cache.getText('data'));
	
	list = json.elements;
	map['gameplay'] = json.gameplay;

	var i = 0;
	while ( i < list.length ) {

		var buffer;

		if(list[i].type in map){
            buffer = map[list[i].type].create(parseInt(list[i].x), parseInt(list[i].y), list[i].type);
            this.apply_effect(buffer, list[i].type);
            
        }else {
          	console.log(map[list[i].type]);
            map[list[i].type] = game.add.group();
            map[list[i].type].enableBody = true;
            buffer = map[list[i].type].create(parseInt(list[i].x), parseInt(list[i].y), list[i].type);
            this.apply_effect(buffer, list[i].type);
        }

        //buffer.scale.setTo(0.5, 0.5);

        i++;

	}
	return map;

};

Loader.prototype.apply_effect = function(buffer, type) {

	if( type != "ground" ) {
		buffer.scale.setTo(0.5, 0.5);
	}
	if ( type == "movable" ) {
		buffer.body.immovable = false;
		buffer.body.collideWorldBounds = true;
		buffer.body.gravity.y = 300;
		buffer.body.drag.x = 100;
	}
	else {
		buffer.body.immovable = true;
	}

	return buffer;

};