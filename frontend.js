(function() {
	
	var frontend = {
		
		width: 0,
		height: 0,
		state: [],
		
		init: function (w,h,m) {
			this.width = w;
			this.height = h;
			console.log(this.state = backend.init(w,h,m));
			this.buildBoard();
		},
		
		buildBoard: function () {
			var d = document.createDocumentFragment(),
				t = document.createElement('table'),
				r = document.createElement('tr'),
				c = document.createElement('td'),
				w = this.width,
				h = this.height,
				s = this.state,
				i = 0,
				j = 0,
				currentRow,
				currentCell;
			c.innerHTML = '&nbsp;';
			d.appendChild(t);
			
			for(i;i<h;i++) {
				
				currentRow = r.cloneNode();

				for(j=0;j<w;j++) {
					currentCell = c.cloneNode();
					currentCell.className = s[i][j].type;
					currentRow.appendChild(currentCell);
				}
				
				t.appendChild(currentRow);
				
			}
			
			document.body.appendChild(d);
			
		}
		
	}
	
	window.onload = function () {
		frontend.init(3,3,Math.random()*0.5+0.25);
	}
	
})()