const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function drawRect(rect) {//塗りつぶしの関数
    ctx.fillStyle = rect.rectColor;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.fill();
}

function drawStroke(rect) {//線を描画する関数
    ctx.strokeStyle = rect.strokeColor;
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    ctx.stroke();
}

class Rect {//図形の情報を入れるクラス
    constructor(x, y, width, height, rectColor, strokeColor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rectColor = rectColor;
        this.strokeColor = strokeColor;
    }
}




class Tetoris extends Rect {//壁、ブロックの情報が入ったクラス
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        
        this.wall = [
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1],
        ]
        this.shape = [
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
        ];


        //１ブロックの縦、横の長さ
        this.block_width = Math.floor(canvas.width / this.shape[0].length);
        this.block_height = this.block_width;

        this.score = 0;

        this.iField = 0;//for文で使う変数
        this.jField = 0;

        this.tetorosRotaRight = [//右回転の時の図形を入れる配列
            [//I
            
            [//I/0
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            ],
            [//I/1
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            ],
            [//I/2
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0],
            ],
            [//I/3
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            ],
            ],

            [//O

            [//O/0
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0],
            ],
            [//O/1
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0],
            ],
            [//O/2
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0],
            ],
            [//O/3
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0],
            ],
            
            ],

            [//L

            [//L/0
            [0,1,0,0],
            [0,1,0,0],
            [0,1,1,0],
            [0,0,0,0],
            ],
            [//L/1
            [1,1,1,0],
            [1,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            ],
            [//L/2
            [1,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,0,0,0],
            ],
            [//L/3
            [0,0,0,0],
            [0,0,1,0],
            [1,1,1,0],
            [0,0,0,0],
            ],

            ],

            [//T

            [//T/0
            [0,1,0,0],
            [1,1,0,0],
            [0,1,0,0],
            [0,0,0,0],
            ],
            [//T/1
            [0,1,0,0],
            [1,1,1,0],
            [0,0,0,0],
            [0,0,0,0],
            ],
            [//T/2
            [0,1,0,0],
            [0,1,1,0],
            [0,1,0,0],
            [0,0,0,0],
            ],
            [//T/3
            [0,0,0,0],
            [1,1,1,0],
            [0,1,0,0],
            [0,0,0,0],
            ],

            ],

            [//S

            [//S/0
            [0,1,1,0],
            [1,1,0,0],
            [0,0,0,0],
            [0,0,0,0],
            ],
            [//S/1
            [1,0,0,0],
            [1,1,0,0],
            [0,1,0,0],
            [0,0,0,0],
            ],
            [//S/2
            [0,1,1,0],
            [1,1,0,0],
            [0,0,0,0],
            [0,0,0,0],
            ],
            [//S/3
            [1,0,0,0],
            [1,1,0,0],
            [0,1,0,0],
            [0,0,0,0],
            ],

            ],

            [//L

            [//L/0
            [0,1,0,0],
            [0,1,0,0],
            [1,1,0,0],
            [0,0,0,0],
            ],
            [//L/1
            [1,0,0,0],
            [1,1,1,0],
            [0,0,0,0],
            [0,0,0,0],
            ],
            [//L/2
            [0,1,1,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,0,0,0],
            ],
            [//L/3
            [0,0,0,0],
            [1,1,1,0],
            [0,0,1,0],
            [0,0,0,0],
            ],

            ],

            [//S

            [//S/0
            [1,1,0,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0],
            ],
            [//S/1
            [0,0,1,0],
            [0,1,1,0],
            [0,1,0,0],
            [0,0,0,0],
            ],
            [//S/2
            [0,0,0,0],
            [1,1,0,0],
            [0,1,1,0],
            [0,0,0,0],
            ],
            [//S/3
            [1,0,0,0],
            [1,1,0,0],
            [0,1,0,0],
            [0,0,0,0],
            ],

            ],


        ];


    }
    
    
    draw() {//描画
        
        for (this.i = 0; this.i < this.wall.length; this.i++) {
            for (this.j = 0; this.j < this.wall[0].length; this.j++) {
                if (this.wall[this.i][this.j]) {
                    const wallBlock = new Rect(
                        this.block_width * this.j, this.block_height * this.i,
                        this.block_width, this.block_height, "gray", "white"
                    );
                    
                    drawRect(wallBlock);
                    drawStroke(wallBlock);
                    
                }
            }
        }


        //フィールド
        for (this.iField = 0; this.iField < this.shape.length; this.iField++) {

            for (this.jField = 0; this.jField < this.shape.length; this.jField++) {
                if (this.shape[this.iField][this.jField]) {
                    if (this.jField === 0 || this.jField === 11) {
                        this.fieldBlock = new Rect(
                            this.block_width * this.jField, this.block_height * this.iField,
                            this.block_width, this.block_height, "gray", "white"
                        );
                    } else {
                        this.fieldBlock = new Rect(
                            this.block_width * this.jField, this.block_height * this.iField,
                            this.block_width, this.block_height, "black", "white"
                        );
                    }

                    drawRect(this.fieldBlock);
                    drawStroke(this.fieldBlock);

                    
                }
            }

            
        }

        this.iTetoro = 0;
        this.jTetoro = 0;

        const drawTetoro = () => {
            for (this.iTetoro = 0; this.iTetoro < this.tetorosRotaRight[this.r][moveTetoro.angle].length; this.iTetoro++) {
                for (this.jTetoro = 0; this.jTetoro < this.tetorosRotaRight[this.r][moveTetoro.angle][this.iTetoro].length; this.jTetoro++) {
                    if (this.tetorosRotaRight[this.r][moveTetoro.angle][this.iTetoro][this.jTetoro]) {
                        this.tetoroBlockX = this.block_width * this.jTetoro;//テトロミノの形を作るブロックのx座標
                        this.tetoroBlockY = this.block_height * this.iTetoro;//テトロミノの形を作るブロックのy座標
                        this.iAfter = this.iTetoro + 1;

                        this.tetoroRect = new Rect(this.tetoroBlockX + this.tetoroX * this.block_width, this.tetoroBlockY + this.tetoroY * this.block_height, this.block_width, this.block_height, this.tetoroColor, '#000');
                        
                        drawRect(this.tetoroRect);
                        drawStroke(this.tetoroRect);
                    }
                }
            }
        }
        drawTetoro();

    }
    

    initBlock() {
        this.tetoroX = 4;//テトロミノのx座標
        this.tetoroY = 0;//テトロミノのy座標

        this.r = Math.floor(Math.random() * 7);

        if (this.r === 0) {//テトロミノによって色を変える
            this.tetoroColor = '#a9ceec';
        } else if (this.r === 1) {
            this.tetoroColor = '#ffff00';
        } else if (this.r === 2 || this.r === 5) {
            this.tetoroColor = '#ed9e00';
        } else if (this.r === 3) {
            this.tetoroColor = '#d55fed';
        } else {
            this.tetoroColor = '#ced759';
        }

    }

    initAll() {

        this.shape = [//積み上がったブロックを記録する配列
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
        ];
        

    }
    
    update () {
 
        setInterval(() => {
            this.beforeTetoroY = this.tetoroY;

            moveTetoro.downTetoro();
            setInterval (() => {
                if (this.beforeTetoroY === this.tetoroY) {//テトロミノが静止した時
                    for (let i = 0; i < this.tetorosRotaRight[this.r][moveTetoro.angle].length; i++ ) { 
                        for (let j = 0; j < this.tetorosRotaRight[this.r][moveTetoro.angle].length; j++) {
                            if (this.tetorosRotaRight[this.r][moveTetoro.angle][i][j]) {
                                this.shape[this.tetoroY+i][this.tetoroX+j] = this.tetorosRotaRight[this.r][moveTetoro.angle][i][j];//ブロックの位置を記録       
                            }
                        }
                    }
                    
                    this.initBlock();
                    moveTetoro.init();

                    moveTetoro.blockSeach.push(tetoris.tetorosRotaRight[this.r][moveTetoro.angle]);
                    this.shape.forEach((shape, i) => {//消した時に上の配列を１段下げる
                        if (!shape.includes(0)) {
                            this.shape[i].splice(1);
                            this.score += 100;
                            document.getElementById("score").innerHTML = `Score: ${tetoris.score}`;
                            for (let j = 0; j < i; j++) {
                                this.shape[1] = [1,0,0,0,0,0,0,0,0,0,0,1];//一番上に層の追加
                                this.shape[i - j] = this.shape[i - j - 1];
                            }
                        }
                    });
                    moveTetoro.angle = 0;
                    moveTetoro.jugeDown = [];
                }
            }, 2000);
          }, 1000);        
                
            setInterval (() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.draw();
            }, 100);
            
            setInterval (() => {
                if(this.shape[0].includes(1)) {//ゲームオーバー（一番上にブロックが来た時）
                    location.reload();
                }
                moveTetoro.pushTetoroX();
                moveTetoro.pushTetoroY();
                moveTetoro.jugeLeft = [];
                moveTetoro.moveLeftIns();
                moveTetoro.jugeRight = [];
                moveTetoro.moveRightIns();
                moveTetoro.jugeRotateRight = [];
                moveTetoro.rotateRightTetoroIns();
                moveTetoro.jugeRotateLeft = [];
                moveTetoro.rotateLeftTetoroIns();
                moveTetoro.downTetoroIns();
                
            }, 10);
        }

}

class Mtetoro {//テトロミノのクラス
    constructor() {

        this.blockSeach = [];//テトロミを入れる配列
        this.blockNX1 = [];//テトロミノの縦１列にブロックがあるか
        this.blockNX2 = [];
        this.blockNX3 = [];
        this.blockNX4 = [];
        this.blockNY1 = [];//テトロミノの横１列にブロックがあるか
        this.blockNY2 = [];
        this.blockNY3 = [];
        this.blockNY4 = [];

        this.juge = [];

        this.angle = 0;
    }
    
    init() {//配列の初期化
        this.blockSeach.length = 0;
        this.blockNX4.length = 0;
        this.blockNX3.length = 0;
        this.blockNX2.length = 0;
        this.blockNX1.length = 0;
        
        this.blockNY4.length = 0;
        this.blockNY3.length = 0;
        this.blockNY2.length = 0;
        this.blockNY1.length = 0;
    }

    pushTetoroX() {
        this.init();
        this.blockSeach.push(tetoris.tetorosRotaRight[tetoris.r][moveTetoro.angle]);
        for (let i = 0; i < this.blockSeach[0].length; i++ ) { 
            this.blockNX4.push(this.blockSeach[0][i][3]);
            this.blockNX3.push(this.blockSeach[0][i][2]);
            this.blockNX2.push(this.blockSeach[0][i][1]);
            this.blockNX1.push(this.blockSeach[0][i][0]);
        }
    }

    pushTetoroY() {
        this.init();
        this.blockSeach.push(tetoris.tetorosRotaRight[tetoris.r][moveTetoro.angle]);
        this.blockNY1.push(this.blockSeach[0][0]);
        this.blockNY2.push(this.blockSeach[0][1]);
        this.blockNY3.push(this.blockSeach[0][2]);
        this.blockNY4.push(this.blockSeach[0][3]);
    }

    moveLeftIns() {//テトロミノの左にブロックがあるか
        moveTetoro.jugeLeft = [];
        for (let i = 0; i < moveTetoro.blockSeach[0].length; i++) {
            for (let j = 0; j < moveTetoro.blockSeach[0][i].length; j++) {
                if (moveTetoro.blockSeach[0][i][j]) {
                    this.jugeLeft.push(tetoris.shape[tetoris.tetoroY+i][tetoris.tetoroX+j-1] === 0);
                }
            }
        }
    }

    moveRightIns() {
        moveTetoro.jugeRight = [];
        for (let i = 0; i < moveTetoro.blockSeach[0].length; i++) {
            for (let j = 0; j < moveTetoro.blockSeach[0][i].length; j++) {
                if (moveTetoro.blockSeach[0][i][j]) {
                    this.jugeRight.push(tetoris.shape[tetoris.tetoroY+i][tetoris.tetoroX+j+1] === 0);
                }
            }
        }
    }

    downTetoroIns() {
        moveTetoro.jugeDown = [];
        for (let i = 0; i < moveTetoro.blockSeach[0].length; i++) {
            for (let j = 0; j < moveTetoro.blockSeach[0][i].length; j++) {
                if (moveTetoro.blockSeach[0][i][j]) {
                    this.jugeDown.push(tetoris.shape[tetoris.tetoroY+i+1][tetoris.tetoroX+j] === 0);
                }
            }
        }
    }

    rotateRightTetoroIns() {
        moveTetoro.jugeRotateRight = [];
        if (moveTetoro.angle < 3) {
            for (let i = 0; i < tetoris.tetorosRotaRight[tetoris.r][this.angle+1].length; i++) {
                for (let j = 0; j < tetoris.tetorosRotaRight[tetoris.r][this.angle+1][i].length; j++) {
                    if (tetoris.tetorosRotaRight[tetoris.r][this.angle+1][i][j]) {
                        this.jugeRotateRight.push(tetoris.shape[tetoris.tetoroY+i][tetoris.tetoroX+j] === 0 && !(tetoris.tetoroY+i === 20));
                    }
                }
            }
        
        } else {
            for (let i = 0; i < tetoris.tetorosRotaRight[tetoris.r][0].length; i++) {
                for (let j = 0; j < tetoris.tetorosRotaRight[tetoris.r][0][i].length; j++) {
                    if (tetoris.tetorosRotaRight[tetoris.r][0][i][j]) {
                        this.jugeRotateRight.push(tetoris.shape[tetoris.tetoroY+i][tetoris.tetoroX+j] === 0 && !(tetoris.tetoroY+i === 20));
                    }
                }
            }
        } 
    }
    rotateLeftTetoroIns() {
        moveTetoro.jugeRotateLeft = [];
        if (moveTetoro.angle > 0) {
            for (let i = 0; i < tetoris.tetorosRotaRight[tetoris.r][this.angle-1].length; i++) {
                for (let j = 0; j < tetoris.tetorosRotaRight[tetoris.r][this.angle-1][i].length; j++) {
                    if (tetoris.tetorosRotaRight[tetoris.r][this.angle-1][i][j]) {
                        this.jugeRotateLeft.push(tetoris.shape[tetoris.tetoroY+i][tetoris.tetoroX+j] === 0 && !(tetoris.tetoroY+i === 20));
                    }
                }
            }
        
        } else {
            for (let i = 0; i < tetoris.tetorosRotaRight[tetoris.r][3].length; i++) {
                for (let j = 0; j < tetoris.tetorosRotaRight[tetoris.r][3][i].length; j++) {
                    if (tetoris.tetorosRotaRight[tetoris.r][3][i][j]) {
                        this.jugeRotateLeft.push(tetoris.shape[tetoris.tetoroY+i][tetoris.tetoroX+j] === 0 && !(tetoris.tetoroY+i === 20));
                    }
                }
            }
        } 
    }

    moveRightTetoro () {//テトロミノを右へ移動させる
        this.pushTetoroX();
        if (!this.jugeRight.includes(false)) {

            if (this.blockNX4.includes(1)) {
             if (tetoris.tetoroX < 7) {
                    tetoris.tetoroX += 1;
                }
            } else if (this.blockNX3.includes(1)) {
                if (tetoris.tetoroX < 8) {
                    tetoris.tetoroX += 1;
                }
            } else if (this.blockNX2.includes(1)) {
                if (tetoris.tetoroX < 9 ) {
                    tetoris.tetoroX += 1;
                }
            } else {
                if (tetoris.tetoroX < 10 ) {
                    tetoris.tetoroX += 1;
                }
            }
             
        }

    }
    
    moveLeftTetoro() {//テトロミノを左へ移動させる
        this.pushTetoroX();
        if (!this.jugeLeft.includes(false)) {
            if (this.blockNX1.includes(1)) {
                if (tetoris.tetoroX > 1){
                    tetoris.tetoroX -= 1;
                }
            } else if (this.blockNX2.includes(1)) {
                if (tetoris.tetoroX > 0){
                    tetoris.tetoroX -= 1;
                }
            } else if (this.blockNX3.includes(1)){
                if (tetoris.tetoroX > -1 ) {
                    tetoris.tetoroX -= 1;
                }
            } else {            
                if (tetoris.tetoroX > -2 ) {
                    tetoris.tetoroX -= 1;
                }
            }
        }
    }
    

    
    downTetoro() {//テトロミノを下げる
        moveTetoro.pushTetoroX();
        moveTetoro.pushTetoroY();

        if (!this.jugeDown.includes(false)) {    
            if (this.blockNY4[0].includes(1)) {
                if (tetoris.tetoroY < 16) {
                    tetoris.tetoroY += 1;
                }
            } else if (this.blockNY3[0].includes(1)) {
                if (tetoris.tetoroY < 17) {
                    tetoris.tetoroY += 1;
                }
            } else if (this.blockNY2[0].includes(1)){
                if(tetoris.tetoroY < 18 ) {
                    tetoris.tetoroY += 1;
                }
            } else {
                if (tetoris.tetoroY < 19 ) {
                    tetoris.tetoroY += 1;
                }
            }
        }
    }
  
    moveRotateRightTetoro() {//右回転
        if (moveTetoro.angle < 3) {
            moveTetoro.angle += 1;
        } else {
            moveTetoro.angle = 0;
        }
    }
  
    moveRotateLeftTetoro() {//左回転
        if (moveTetoro.angle > 0) {
            moveTetoro.angle -= 1;
        } else {
            moveTetoro.angle = 3;
        }
    }

}

const tetoris = new Tetoris();
const moveTetoro = new Mtetoro();

tetoris.initBlock();
tetoris.update();
document.getElementById("score").innerHTML = `Score: ${tetoris.score}`;


//矢印キーでの操作
document.addEventListener('keydown', (e) => {

    if (e.key === 'ArrowLeft') {
        moveTetoro.moveLeftTetoro();//左
    }
    if (e.key === 'ArrowRight') {
        moveTetoro.moveRightTetoro();//右
    }
    if (e.key === ' ') {
        moveTetoro.downTetoro();//下
    }

    //左右回転
    if (e.key === 'ArrowUp') {
        if (!moveTetoro.jugeRotateRight.includes(false)) {
            moveTetoro.moveRotateRightTetoro();
        }
    }

    if (e.key === 'ArrowDown') {
        if (!moveTetoro.jugeRotateLeft.includes(false)) {
            moveTetoro.moveRotateLeftTetoro();
        }
    }
});

