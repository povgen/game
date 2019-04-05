class Hero {
    constructor(src, ctx, speed = 20) {
        this.sprite = new Image();
        this.sprite.src = src; // путь/ссылка на спрайт
        // позиция героя
        this.x = 0;
        this.y = 0;

        this.speed  = speed;
        this.ctx    = ctx; //Ссылка на canvas, точнее на его контест
        this.width  = 64;  //Ширина моделки в спрайте
        this.height = 64;  //Высота моделки в спрайте
        this.count  = 9;   //количество кадров анимации в спрайте
        this.i      = 0;   //номер кадра

        // направление движения анимации
        this.pos = [
            0, //вверх
            1, //влево
            2, //вниз
            3  //вправо
        ]; 
        this.dir    = 2; // то куда будет смотреть герой не в движении, стандартно вниз
    }

    drawAnimate(sx, sy) {
        //this.ctx.clearRect(0, 0, 400, 512);
        this.ctx.drawImage(this.sprite, sx + this.width * this.i, sy, this.width, this.height, this.x, this.y, this.width, this.height);
        this.i++;
        if (this.i == this.count)
            this.i = 0;
    }

    moveLeft() {
        this.x -= this.speed;
        this.drawAnimate(0, this.height * this.pos[1]);
        this.dir = 1;
    }
    moveRight() {
        this.x += this.speed;
        this.drawAnimate(0, this.height*this.pos[3]);
        this.dir = 3;
    }
    moveUp() {
        this.y -= this.speed;
        this.drawAnimate(0, this.height*this.pos[0]);
        this.dir = 0;
    }
    moveDown() {
        this.y += this.speed;
        this.drawAnimate(0, this.height*this.pos[2]);
        this.dir = 2;
    }
    stay() {
        this.ctx.drawImage(this.sprite, 0, this.pos[this.dir] * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}