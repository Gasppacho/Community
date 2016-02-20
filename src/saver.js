
Community.Saver = function(game) {

	/**
	 * This variable is where elements will be saved
	 * @type {Array}
	 */
    this.str = [];

};

Community.Saver.prototype = {

	addElement: function(x, y, type, effet) {
        this.str.push(type);
        this.str.push(x);
        this.str.push(y);
        this.str.push(effet);
    },

    save: function() {
        localStorage.clear();
        localStorage.setItem('level', JSON.stringify(this.str));
    }

};