(function() {
	
	var frontend = {
		
		width: 0,
		height: 0,
		state: [],
		cells: [],
		
		init: function (w,h,m) {
			this.width = w;
			this.height = h;
			this.state = backend.init(w,h,m);
			this.buildBoard();
		},
		
		buildBoard: function () {
			document.body.innerHTML = '';
			var d = document.createDocumentFragment(),
				t = document.createElement('main'),
				r = document.createElement('section'),
				c = document.createElement('article'),
				w = this.width,
				h = this.height,
				s = this.state,
				i = 0,
				j = 0,
				self = this,
				currentRow,
				currentCell,
				cells = [];
				
			//c.innerHTML = '&nbsp;';
			d.appendChild(t);
			
			for(i;i<h;i++) {
				
				currentRow = r.cloneNode();
				currentRowArr = [];
				
				for(j=0;j<w;j++) {
					currentCell = c.cloneNode();
					currentCell.className = s[i][j].type + ' ' + s[i][j].state;
					
					(function(x,y) {
						currentCell.addEventListener('contextmenu', function(e) {
							e.preventDefault();
							e.stopPropagation();
							self.rightClick(x,y);
						}, false);
						currentCell.addEventListener('click', function(e) {
							e.preventDefault();
							e.stopPropagation();
							self.leftClick(x,y);
						}, false);
					})(j,i)
					
					currentRow.appendChild(currentCell);
					currentRowArr.push(currentCell);
				}
				
				t.appendChild(currentRow);
				cells.push(currentRowArr.slice(0));
			}
			
			document.body.appendChild(d);
			this.cells = cells;
		},
		
		updateBoard: function() {
			var w = this.width,
				h = this.height,
				s = this.state,
				c = this.cells,
				i = 0,
				j = 0,
				self = this,
				currentRow,
				currentCell;
			
			for(i;i<h;i++) {
				for(j=0;j<w;j++) {
					c[i][j].className = s[i][j].type + ' ' + s[i][j].state;
					if(s[i][j].state === 'numbered') {
						c[i][j].dataset.number = s[i][j].number;
					}
					
				}
			}	
		},
		
		rightClick: function(x,y) {
			this.state = backend.flag(x,y);
			this.updateBoard();
		},
		
		leftClick: function(x,y) {
			if(this.state[y][x].state === 'hidden') {
				this.state = backend.reveal(x,y);
				console.log(this.state[y][x]);
				this.updateBoard();
			}
		}
		
	}
	
	
	
	window.onload = function () {
		frontend.init(5,5,Math.random()*0.5+0.25);
	}
	
	window.onresize = function() {
		
	}
	
})()