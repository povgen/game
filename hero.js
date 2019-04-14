class Hero {
    constructor(src, ctx, map, arrOfTile, speed = 20) {
        this.arrOfTile = arrOfTile;
        this.sprite = new Image();
        this.sprite.src = src; // ����/������ �� ������
        // ������� �����
        this.x = 0;
        this.y = 0;

        this.map = map;
       // this.tileX = 0; // ����� ����� �� X
       // this.tileY = 0; // ����� ����� �� Y

        this.speed      = speed;
        this.ctx        = ctx;  //������ �� canvas, ������ �� ��� �������
        this.width      = 64;   //������ ������� � �������
        this.height     = 64;  //������ ������� � �������
        this.count      = 9;   //���������� ������ �������� ������������ � �������
        this.countShoot = 13;  //���������� ������ �������� ��������
        this.i          = 0;   //����� �����

        // ������ ����� ������� � ����������� �������� ��������
        this.pos = [
            8, //�����
            9, //�����
            10, //����
            11  //������
        ]; 
      
        this.dir    = 2; // �� ���� ����� �������� ����� �� � ��������, ���������� ����
    }

    moveAnimate(sx, sy) {
        this.ctx.drawImage(this.sprite, sx + this.width * this.i, sy, this.width, this.height, this.x, this.y, this.width, this.height);
        this.i++;
        if (this.i == this.count)
            this.i = 0;
    }


    moveLeft() {
        this.x -= this.speed * this.getAcceleration(this.x - this.speed, this.y);
        this.moveAnimate(0, this.height * this.pos[1]);
        this.dir = 1;
    }
    moveRight() {
        this.x += this.speed * this.getAcceleration(this.x + this.speed, this.y);
        this.moveAnimate(0, this.height*this.pos[3]);
        this.dir = 3;
    }
    moveUp() {
        this.y -= this.speed *this.getAcceleration(this.x, this.y - this.speed);
        this.moveAnimate(0, this.height*this.pos[0]);
        this.dir = 0;
    }
    moveDown() {
        this.y += this.speed * this.getAcceleration(this.x, this.y + this.speed);
        this.moveAnimate(0, this.height*this.pos[2]);
        this.dir = 2;
    }
    stay() {
        this.ctx.drawImage(this.sprite, 0, this.pos[this.dir] * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    getAcceleration(x, y) {

        x -= 20;
        let tileX = Math.floor(y / 50) + 1;
        let tileY = Math.floor(x / 50) + 1;
        return this.arrOfTile[this.map[tileX][tileY]].acl;
    } 
}