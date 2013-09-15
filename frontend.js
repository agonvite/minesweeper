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
		
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		t.appendChild(this.canvas);
		
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
	},
	
	drawCanvas: function (dim) {
		this.canvas.width = this.canvas.height = RATIO*dim;
		this.canvas.style.width = this.canvas.style.height = dim + 'px';
		var ctx = this.ctx,
			i = 0,
			y = 0,
			j = 0,
			x = 0,
			w = this.width,
			dw = RATIO*dim/w;
			h = this.height,
			dh = RATIO*dim/h;
		
		for(i;i<=dim*RATIO;i+=dh) {
			y = Math.floor(i);
			for(j=0;j<=dim*RATIO;j+=dw) {
				x = Math.floor(j);
				drawCross(ctx, x, y);
			}
		}
	}
	
}

var container,
	cornerImg;


window.onload = function () {
	frontend.init(3,3,0.0444444444444);
	container = document.body.querySelector('main');
	
	cornerImg = new Image();
	cornerImg.src = 'assets/corners.svg';
	
	cornerImg.onload = function() {
		layout();
	}
}

RATIO = devicePixelRatio / document.createElement('canvas').getContext('2d').webkitBackingStorePixelRatio


layout = function() {
	var w = document.body.clientWidth,
		h = document.body.clientHeight,
		x = Math.min(document.body.clientWidth, document.body.clientHeight);
	container.style.width = container.style.height = x + 'px';
	container.style.top = container.style.left = 0;
	if(w>h) {
		container.style.left = (w-h)/2 + 'px';
	} else {
		container.style.top = (h-w)/2 + 'px';
	}
	
	frontend.drawCanvas(x);
}

drawCross = function(ctx, x, y) {
// 	ctx.fillRect(x-5, y-5, RATIO*10, RATIO*10);
	ctx.drawImage(cornerImg,x-RATIO*(x === ctx.canvas.width?5:4),y-RATIO*(y === ctx.canvas.height?5:4),RATIO*9,RATIO*9);
	console.log(x === ctx.canvas.width);
}


window.onresize = function() {
	layout();
}