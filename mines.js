var backend = {
	init: function (width, height) {
		var	   l = height*width,
			   i = 0,
               j = 0,
		       a = new Array(l),
           board = [],
		 	cell = {
				type: 'empty', 		//mine, empty
				state: 'initial', 	//hidden, numbered, flagged, blank
				number: null, 		//[1-9]
				flagged: false 		//true, false
			};
		for(i;i<l;i++){
			a[i] = cell;
		}
        
        for(j;j<height;j++) {
            board.push(a.slice(j*width,(j+1)*width));
        }
        
		return board;
		
	}
}