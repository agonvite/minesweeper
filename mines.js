var backend = {
    width: 0,
    height: 0,
    board: [],
    turns: 0,
    hiddenNonMines: 0,
    markedMines: 0,
    
	init: function (width, height, density) {
		var	   l = height*width,
               m = Math.floor(l*density),
			   i = 0,
               j = 0,
		       a = new Array(l),
           board = [];
           
        this.width = width;
        this.height = height;
		this.hiddenNonMines = l-m;
		for(i;i<l;i++){
			a[i] = {
				type: 'empty', 		//mine, empty
				state: 'hidden', 	//hidden, numbered, flagged, blank
				number: null, 		//[1-8]
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
            this.markedMines++;
        }
        else if(c.state === 'flagged') {
            c.state = 'hidden';
            this.markedMines--;
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
    
    reveal: function(x,y,isFlood) {
        
        if(x<0||y<0||y>=this.height||x>=this.width||this.board[y][x].state !=='hidden') return;
        
        var c = this.board[y][x],
            n = this.getNumber(x,y);
        
        if(!isFlood) this.turns++;
        
        if(c.state === 'hidden'){
            if (this.hasMine(x,y)) {
                alert('you died in ' + this.turns + ' turns');
            }
            else if (n) {
                c.state = 'numbered';
                c.number = n;
                this.hiddenNonMines--;
            }
            else {
                c.state = 'blank';
                console.log(this.board[y][x])
                this.hiddenNonMines--;
                this.floodFill(x,y);
            }
        }
        this.winConditionCheck();
        this.board[y][x] = c;
        return this.board;
    },
    
    winConditionCheck: function() {
        var w = !this.hiddenNonMines;
        if(w) alert('YOU WON IN ' + this.turns + ' TURNS');
    },
    
    floodFill: function(x,y) {
         
     var    i = -1,
            j = -1;
            
        
        for(i;i<2;i++){
            for(j=-1;j<2;j++){
                if(i===0 && j===0 || this.board[y][x].state ==='hidden'){continue;}
                this.reveal(x+i,y+j, true);
            }
            
        }
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




















