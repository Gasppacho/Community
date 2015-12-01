function MapSaver() {
   /**
    *   This varible is where every element will be store.
    */
    this.str = [];
    
   /**
    *   This function take the position and the type of an element to store it in str[].
    */
    this.addElement = function(x, y, type, effet) {
        this.str.push(type);
        this.str.push(x);
        this.str.push(y);
        this.str.push(effet);
    },
    
   /** 
    *   This function save all the map in the local storage.
    *   The local storage is made by a key 'level'.
    */
    this.save = function() {
        localStorage.clear();
        localStorage.setItem('level', JSON.stringify(this.str));
    };
}