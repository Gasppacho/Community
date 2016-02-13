function MapSaver() { 
   /**
    *   This varible is where every element will be store.
    */
    this.str = [];
    this.jsonTxt = '{"elements":[';
    this.jsonObj;
    this.saved = false;

    this.counter = 0;
    
   /**
    *   This function take the position and the type of an element to store it in str[].
    */
    this.addElement = function(x, y, type, effet) {
        
        this.counter ++;

        this.saved = false;
        
        this.jsonTxt += '{"type":"' + type + '", "x":"' + x + '", "y":"' + y + '"},'
        /*this.jsonTxt += '"' + type + '",';
        this.jsonTxt += '"' + x + '",';
        this.jsonTxt += '"' + y + '",';
        this.jsonTxt += '"' + effet + '",';*/
        
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
        
        if(this.saved == false){
            this.jsonTxt = this.jsonTxt.substring(0, this.jsonTxt.length-1);
            this.jsonTxt += ']';
            this.jsonTxt += ',"size":"' + this.counter + '"}';
            console.log(this.jsonTxt);
            this.saved = true;
            
            var data = "text/json;charset=utf-8," + encodeURIComponent(this.jsonTxt);

            var a = document.createElement('a');
            a.href = 'data:' + data;
            a.download = 'data.json';
            a.innerHTML = 'download JSON';

            var container = document.getElementById('gameDiv');
            container.appendChild(a);
        }
        
        localStorage.clear();
        localStorage.setItem('level', JSON.stringify(this.str));
    };
}