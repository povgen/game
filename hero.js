class Arrow {
    constructor(x, y, dir, ctx) {
        this.x = x;
        this.y = y;
        this.curDir = dir;
        this.dir = {
            'Up'   : 0,
            'Left' : 1,
            'Down' : 2,
            'Right': 3
        };
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = "img/arrow.png";
        this.speed = 10;
    }
    fly() {
        if (this.curDir == this.dir['Right'])
            this.x += this.speed;
        if (this.curDir == this.dir['Left'])
            this.x -= this.speed;
        if (this.curDir == this.dir['Down'])
            this.y += this.speed;
        if (this.curDir == this.dir['Up'])
            this.y -= this.speed;

        this.ctx.drawImage(this.img, this.x, this.y)

    }
}
class Hero {
    constructor(src, ctx, map, arrOfTile, speed = 20) {
        this.arrOfTile = arrOfTile;
        this.sprite = new Image();
        this.sprite.src = src; // путь/ссылка на спрайт
        // позиция героя
        this.x = 0;
        this.y = 0;

        this.map = map;
       // this.tileX = 0; // Номер тайла по X
       // this.tileY = 0; // Номер тайла по Y

        this.speed      = speed;
        this.ctx        = ctx;  //Ссылка на canvas, точнее на его контест
        this.width      = 64;   //Ширина моделки в спрайте
        this.height     = 64;  //Высота моделки в спрайте
        this.countShoot = 13;  //Количество кадров анимации стрельбы
        this.slowShoot  = 5;   //Замедление анимации стрельбы в n раз  
        this.iShoot     = 0;   //номер кадра стрельбы
        this.countMove  = 9;   //количество кадров анимации передвижения в спрайте
        this.slowMove   = 5;   //Замедление анимации передвижения стрельбы в n раз  
        this.iMove      = 0;   //номер кадра
        this.arrows     = [];  


        // номера строк спрайта с напревлинми движения анимации
        this.pos = [
            8, //вверх
            9, //влево
            10, //вниз
            11  //вправо
        ]; 
        this.posShoot = [
            16, //вверх
            17, //влево
            18, //вниз
            19 //вправо
        ]
        this.dir    = 2; // то куда будет смотреть герой не в движении, стандартно вниз
    }

    moveAnimate(y) {
        this.iShoot = 0;
        this.ctx.drawImage(this.sprite, this.width * Math.floor(this.iMove / this.slowMove), y * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        this.iMove++;
        if (Math.floor(this.iMove / this.slowMove) == this.countMove)
            this.iMove = 0;
    }

    shootAnimate(y) {
        this.ctx.drawImage(this.sprite, this.width * Math.floor(this.iShoot/this.slowShoot), y * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        this.iShoot++;
        if (Math.floor(this.iShoot / this.slowShoot) == this.countShoot)
            this.iShoot = 0;
    }

    shoot() {
        this.shootAnimate(this.posShoot[this.dir]);
        if (this.iShoot / this.slowShoot == 9.0) {
            this.arrows.push(new Arrow(this.x + 20, this.y + 30, this.dir, this.ctx));
        }
    }

    arrowFly() {
        for (let i = 0; i < this.arrows.length; i++) {
            //this.arrow.fly();
            this.arrows[i].fly();
        }
    }

    moveLeft() {
        this.x -= this.speed * this.getAcceleration(this.x - this.speed, this.y);
        this.moveAnimate(this.pos[1]);
        this.dir = 1;
    }
    moveRight() {
        this.x += this.speed * this.getAcceleration(this.x + this.speed, this.y);
        this.moveAnimate(this.pos[3]);
        this.dir = 3;
    }
    moveUp() {
        this.y -= this.speed *this.getAcceleration(this.x, this.y - this.speed);
        this.moveAnimate(this.pos[0]);
        this.dir = 0;
    }
    moveDown() {
        this.y += this.speed * this.getAcceleration(this.x, this.y + this.speed);
        this.moveAnimate(this.pos[2]);
        this.dir = 2;
    }
    stay() {
        this.iShoot = 0;
        this.ctx.drawImage(this.sprite, 0, this.pos[this.dir] * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    getAcceleration(x, y) {

        x -= 20;
        let tileX = Math.floor(y / 50) + 1;
        let tileY = Math.floor(x / 50) + 1;
        return this.arrOfTile[this.map[tileX][tileY]].acl;
    } 
}