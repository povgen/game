// JavaScript source code
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var keyDown = 0;



class Hero {
    constructor(src, ctx, speed = 20) {
        this.sprite = new Image();
        this.sprite.src = src;
        this.x = 0;
        this.y = 0;
        this.speed = speed;
        this.ctx = ctx;
        this.i = 0;
        this.width = 48;
        this.count = 3;
    }

    moveAnimate(sx, sy) {
        this.ctx.clearRect(0, 0, 400, 512);
        this.ctx.drawImage(this.sprite, sx + this.width * this.i, sy, 48, 48, this.x, this.y, 48, 48);
        this.i++;
        if (this.i == this.count)
            this.i = 0;
    }

    moveLeft() {
        this.x -= this.speed;
        this.moveAnimate(0, 48);
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
        this.x += this.speed;
        this.moveAnimate(0, 0);
    }
}

var object = {
    height: 40,
    width: 40,
    x: 10,
    y: 10,
    color: "FF0000"
};

var keys = {
    'W': 87,
    'S': 83,
    'D': 68,
    'A': 65
};

var setKey = function (keyCode) {
    keyDown = keyCode;
};

var clearKey = function () {
    keyDown = 0;
}

var gameEngine = function () {
    if (typeof engine == 'function')
        engine();
    else
        document.body.innerHTML = 'Не определена функция engine';
    requestAnimationFrame(gameEngine);
};

var isKeyDown = function (KeyName) {
    return keyDown == keys[KeyName];
};

window.onload = function () {
    window.onkeydown = function (e) {
        setKey(e.keyCode);
    };

    window.onkeyup = function () {
        clearKey();

    };

    gameEngine();
}

