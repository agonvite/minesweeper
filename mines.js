var backend = {
    
    board: [],
    
	init: function (width, height, density) {
		var	   l = height*width,
               m = Math.floor(l*density),
			   i = 0,
               j = 0,
		       a = new Array(l),
           board = [];
		   
		for(i;i<l;i++){
			a[i] = {
				type: 'empty', 		//mine, empty
				state: 'hidden', 	//hidden, numbered, flagged, blank
				number: null, 		//[1-9]
				flagged: false 		//true, false
			}
            if(i<m){
                a[i].type = 'mine';
            }
		}
        
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
    
    reveal: function(x,y) {
        
        if(this.board[y][x].type === 'empty') {
            var i = 0,
                j = 0,
                l = this.board.length;
                
            for(i;i<l;i++){
                
            }
        }
        
    }
}




















