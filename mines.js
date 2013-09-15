var backend = {
	init: function (width, height) {
		var	   l = height*width,
			   i = 0,
		       a = new Array(l),
		 	cell = {
				type: 'empty', //mine, empty
				state: 'initial' //hidden, numbered, flagged, blank
				number: null, //[1-9]
				flagged: false //true, false
			};
		for(i;i<l;i++){
			a[i] = cell;
		}
		return a;
		
	}
}