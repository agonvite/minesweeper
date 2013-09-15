var backend = {
    width: 0,
    height: 0,
    board: [],
    turns: 0,
    
	init: function (width, height, density) {
		var	   l = height*width,
               m = Math.floor(l*density),
			   i = 0,
               j = 0,
		       a = new Array(l),
           board = [];
           
        this.width = width;
        this.height = height;
		   
		for(i;i<l;i++){
			a[i] = {
				type: 'empty', 		//mine, empty
				state: 'hidden', 	//hidden, numbered, flagged, blank
				number: null, 		//[1-9]
			}
            if(i<m){
                a[i].type = 'mine';
            }
		}
        
        a.shuffle();
        
        for(j;j<height;j++) {
           
            board.push(a.slice(j*width,(j+1)*width));
        }
               
        this.board = board;
		return board;
		
	},
    
    flag: function(x,y) {
        var c = this.board[y][x];
        if(c.state === 'hidden') {
            c.state = 'flagged';
        }
        else if(c.state === 'flagged') {
            c.state = 'hidden';
        }
        
        this.board[y][x] = c;
        
        return this.board;
        
    },
    
    hasMine: function(x,y) {
        return (x>=0 && y>=0 && x<this.width && y<this.height && this.board[y][x].type==='mine');
    }, 
    
    getNumber: function(x,y) {
        var i = -1,
            j = -1,
            k = 0;
        
        for(i;i<2;i++){
            j = -1;
            for(j;j<2;j++){
                if(i===0 && j===0){continue;}
                k += this.hasMine(x+i,y+j) ? 1 : 0;
            }
        }
        
        return k;
        
    },
    
    reveal: function(x,y) {
        var c = this.board[y][x],
            n = this.getNumber(x,y);
        
        
        this.turns++;
        
        if(c.state === 'hidden'){
            if (this.hasMine(x,y)) {
                alert('you died in ' + this.turns + ' turns');
            }
            else if (n) {
                c.state = 'numbered';
                c.number = n;
            }
            else {
                c.state = 'blank';
               
            }
        }
        this.board[y][x] = c;
        return this.board;
    }
}

Array.prototype.shuffle = function () {
  var k, t, len;
 
  len = this.length;
 
  if (len < 2) {
    return this;
  }
 
  while (len) {
    k = Math.floor(Math.random() * len--);
    t = this[k];
 
    while (k < len) {
      this[k] = this[++k];
    }
 
    this[k] = t;
  }
 
  return this;
};




















