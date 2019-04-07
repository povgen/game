class Hero {
    constructor(src, ctx, map, speed = 20) {
        this.sprite = new Image();
        this.sprite.src = src; // ����/������ �� ������
        // ������� �����
        this.x = 0;
        this.y = 0;

        this.map = map;
       // this.tileX = 0; // ����� ����� �� X
       // this.tileY = 0; // ����� ����� �� Y

        this.speed  = speed;
        this.ctx    = ctx; //������ �� canvas, ������ �� ��� �������
        this.width  = 64;  //������ ������� � �������
        this.height = 64;  //������ ������� � �������
        this.count  = 9;   //���������� ������ �������� � �������
        this.i      = 0;   //����� �����

        // ����������� �������� ��������
        this.pos = [
            0, //�����
            1, //�����
            2, //����
            3  //������
        ]; 
        this.dir    = 2; // �� ���� ����� �������� ����� �� � ��������, ���������� ����
    }

    drawAnimate(sx, sy) {
        //this.ctx.clearRect(0, 0, 400, 512);
        this.ctx.drawImage(this.sprite, sx + this.width * this.i, sy, this.width, this.height, this.x, this.y, this.width, this.height);
        this.i++;
        if (this.i == this.count)
            this.i = 0;
    }

    moveLeft() {
        if (this.canMoveTo(this.x - this.speed, this.y))
            this.x -= this.speed;
        this.drawAnimate(0, this.height * this.pos[1]);
        this.dir = 1;
    }
    moveRight() {
        if (this.canMoveTo(this.x + this.speed, this.y))
            this.x += this.speed;
        this.drawAnimate(0, this.height*this.pos[3]);
        this.dir = 3;
    }
    moveUp() {
        if (this.canMoveTo(this.x, this.y - this.speed))
            this.y -= this.speed;
        this.drawAnimate(0, this.height*this.pos[0]);
        this.dir = 0;
    }
    moveDown() {
        if (this.canMoveTo(this.x, this.y + this.speed))
            this.y += this.speed;
        this.drawAnimate(0, this.height*this.pos[2]);
        this.dir = 2;
    }
    stay() {
        this.ctx.drawImage(this.sprite, 0, this.pos[this.dir] * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    canMoveTo(x,y) {
        let tileX = Math.floor(x / 50) + 1;
        let tileY = Math.floor(y / 50) + 1;
        if (map[tileY][tileX] == 0)
            return true;
        else
            return false;
    }
}