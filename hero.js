class Arrow {
    constructor(x, y, dir, ctx) {
        this.x = x;
        this.y = y;
        this.willX = x;
        this.willY = y;
        this.curDir = dir;
        this.timeLife = 600;
        this.dir = {
            'Up': 0,
            'Left': 1,
            'Down': 2,
            'Right': 3
        };
        //Пути для изображения стрелы
        let src = [
            'img/arrow_u.png', //Вверх
            'img/arrow_l.png', //Влево
            'img/arrow_d.png', //Вниз
            'img/arrow_r.png'  //Вправо
        ];
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = src[dir];
        this.speed = 15;
        // изменение начальной позиции стрелы,
        if (this.curDir == this.dir['Right']) { 
            this.x += 35;
            this.y += 32;
            this.willY -= 13;
        }
        if (this.curDir == this.dir['Left']) {
            this.y += 32;
            this.willY -= 13;
        }
        if (this.curDir == this.dir['Down']) {
            this.x += 30;
            this.y += 40;
        }
        if (this.curDir == this.dir['Up']) {
            this.x += 30;
        }
    }
    fly() {
        if (this.curDir == this.dir['Right']) {
            this.x += this.speed;
            this.willX = this.x + this.speed;
        }
        if (this.curDir == this.dir['Left']) {
            this.x -= this.speed;
            this.willX = this.x - (this.speed + 31);
        }
        if (this.curDir == this.dir['Down']) {
            this.y += this.speed;
            this.willY = this.y + (this.speed - 20);
        }
        if (this.curDir == this.dir['Up']) {
            this.y -= this.speed;
            this.willY = this.y - (this.speed + 50);
        }

        this.ctx.drawImage(this.img, this.x, this.y)

    }
    stay() {
        if (this.curDir == this.dir['Right']) {
            this.x = this.willX - this.willX % 50 + 20; 
        }
        if (this.curDir == this.dir['Left']) {
            this.x = this.willX - this.willX % 50 + 50;
        }
        if (this.curDir == this.dir['Down']) {
            this.y = this.willY - this.willY % 50 + 20;
        }
        if (this.curDir == this.dir['Up']) {
            this.y = this.willY - this.willY % 50 + 100;
        }
        this.ctx.drawImage(this.img, this.x, this.y)
        this.timeLife--;
    }
}
class Hero {
    constructor(src, ctx, map, arrOfTile, speed = 20, x = 0, y = 0) {
        this.arrOfTile = arrOfTile;
        this.sprite = new Image();
        this.sprite.src = src; // путь/ссылка на спрайт
        // позиция героя
        this.x = x;
        this.y = y;

        this.map = map;
       // this.tileX = 0; // Номер тайла по X
       // this.tileY = 0; // Номер тайла по Y
        this.speed      = speed;//базовая скорость
        this.curSpeed   = speed;//Текущая скорость
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
        this.acl = 2;
        this.HP = 100;


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
        if (this.iShoot / this.slowShoot == 9.0 &&
            ((this.dir == 0 && this.getAcceleration(this.x, this.y - 50) != 0) || //Проверка можно ли выстрелнуть вверх
            (this.dir == 1 && this.getAcceleration(this.x - 50, this.y - 10) != 0) || //Проверка можно ли выстрелнуть влево
            (this.dir == 2 && this.getAcceleration(this.x, this.y + 15) != 0) || //Проверка можно ли выстрелнуть вниз
            (this.dir == 3 && this.getAcceleration(this.x + 50, this.y - 10) != 0) //Проверка можно ли выстрелнуть вправо
            )
        ) {

            this.arrows.push(new Arrow(this.x, this.y, this.dir, this.ctx));
        }
    }

    arrowFly() {
        for (let i = 0; i < this.arrows.length; i++) {
            //this.arrow.fly();
            if (this.getAcceleration(this.arrows[i].willX, this.arrows[i].willY) == 0) 
                this.arrows[i].stay();
            else
                this.arrows[i].fly();
            if (this.arrows[i].timeLife == 0)
                this.arrows.splice(i, 1);
        }

    }

    checkHitArrow(arrows) {

        for (let i = 0; i < arrows.length; i++) {
            if (arrows[i].x >= this.x && arrows[i].y >= this.y && arrows[i].x <= this.x + this.width && arrows[i].y <= this.y + this.height) { 
                this.HP -= 50;
                arrows.splice(i, 1);
            }
        }

    }

    moveLeft() {
        this.x -= this.curSpeed * this.getAcceleration(this.x - this.curSpeed, this.y);
        this.moveAnimate(this.pos[1]);
        this.dir = 1;
    }
    moveRight() {
        this.x += this.curSpeed * this.getAcceleration(this.x + this.curSpeed, this.y);
        this.moveAnimate(this.pos[3]);
        this.dir = 3;
    }
    moveUp() {
        this.y -= this.curSpeed *this.getAcceleration(this.x, this.y - this.curSpeed);
        this.moveAnimate(this.pos[0]);
        this.dir = 0;
    }
    moveDown() {
        this.y += this.curSpeed * this.getAcceleration(this.x, this.y + this.curSpeed);
        this.moveAnimate(this.pos[2]);
        this.dir = 2;
    }
    speedUp() {
        this.curSpeed = this.speed * this.acl;
        //  this.slowMove = 2;
    }
    speedDown() {
        this.curSpeed = this.speed;
        //this.slowMove = 5;
    }
    stay() {
        this.iShoot = 0;
        this.ctx.drawImage(this.sprite, 0, this.pos[this.dir] * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    getAcceleration(x, y) {

        x -= 20;
        let tileX = Math.floor(y / 50) + 1;
        let tileY = Math.floor(x / 50) + 1;
        try {
            return this.arrOfTile[this.map[tileX][tileY]].acl;
        }
        catch {
            return 0;
        }
    } 
}