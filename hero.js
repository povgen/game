class Hero {
    constructor(src, ctx, speed = 20) {
        this.sprite = new Image();
        this.sprite.src = src; // ����/������ �� ������
        // ������� �����
        this.x = 0;
        this.y = 0;

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