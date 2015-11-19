function MapLoader() {
    this.map;
    this.str;
}

/**
 *  This function load every element of the map into the variable 'map'.
 *  By the time this function will become more complexe to load every aspect of each element.
 *  For the moment all the element are eqqual except the sprite.
 */
MapLoader.prototype.load = function(platforms) {
    var data = localStorage.getItem('level')
    this.str = JSON.parse(data);
    var i = 0;
    while (i < this.str.length){
        console.log(this.str[i]);
        console.log(this.str[i+1]);
        console.log(this.str[i+2]);
        this.map = platforms.create(this.str[i + 1], this.str[i + 2], this.str[i]);
        this.map.body.immovable = true;
        this.map.scale.setTo(0.5, 0.5);
        i += 3;
    }
    return this.map;
};