class Hero {
	constructor(src, ctx, speed = 10) {
		this.sprite = new Image();
		this.sprite.src = src;
		this.x = 0;
		this.y = 0;
		this.speed = speed;
		this.ctx = ctx;
		this.i = 0;
	}
	moveAnimate(sx, sy) {
		console.log(this.ctx);
		this.ctx.clearRect(0,0, 900, 647);
		if (this.i == 0) {
			this.ctx.drawImage(this.sprite, sx, sy, 48, 48, this.x, this.y, 48, 48);
			this.i++;
		} else if (this.i == 1) {
			this.ctx.drawImage(this.sprite, sx+48, sy, 48, 48, this.x, this.y, 48, 48);
			this.i++;
		} else {
			this.ctx.drawImage(this.sprite, sx+96, sy, 48, 48, this.x, this.y, 48, 48);
			this.i = 0;
		}
	}
	moveLeft() {
		this.x -= this.speed;
		this.moveAnimate(0,48);
	}
	moveRight() {
		this.x += this.speed;
		this.moveAnimate(0, 96);
	}
	moveUp() {
		this.y -= this.speed;
		this.moveAnimate(0, 144);
	}
	moveDown() {
		this.y += this.speed;
		this.moveAnimate(0, 0);
             
 	}
}

