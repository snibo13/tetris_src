const edge = 20;
let time;
let player;
let level = 0;
let arena = [];
const colors = [
  {r: 232, g:  63, b:  36}, //s Piece
  {r: 121, g: 172, b:  63}, //t Piece
  {r: 254, g: 247, b:  77}, //o
  {r: 246, g: 145, b:  52},  //l
  {r: 241, g: 109, b: 183},  //j
  {r:  82, g: 224, b: 252},  //i
  {r: 147, g:  57, b: 145}  //z
]

function setup() {
    createCanvas(edge * 10, edge * 20);
    frameRate(60);
    player = new Player();
    player.newPiece();
    time = millis();

    arena = new Array(height / edge);
    for (let i = 0; i < arena.length; i++) {
        arena[i] = new Array(width / edge).fill(0);
    }
}

function draw() {
    background(50);
    drawMatrix(arena, [0, 0]);
    drawMatrix(player.matrix, [player.x, player.y]);
    drawMatrix(player.nextPiece, [0,0])
    if ((millis() - time) > 1000) {
        player.drop();
    }

    if (keyIsDown(DOWN_ARROW)) {
        player.drop();
    }
}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        player.x--;
        if (collide(arena, player)) { // recovery
            player.x++;
        }
    } else if (keyCode == RIGHT_ARROW) {
        player.x++;
        if (collide(arena, player)) { // recovery
            player.x--;
        }
    } else if (keyCode == UP_ARROW) {
        player.rotate();
        if (collide(arena, player)) { // recovery
              player.rotate();
              player.rotate();
              player.rotate();
            }
        }

}

function drawMatrix(matrix, offset) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] != 0) {
                stroke(255);
                strokeWeight(2);
                c = colors[matrix[y][x]-1];
                fill(c.r, c.g, c.b);
                rect((x + offset[0]) * edge, (y + offset[1]) * edge, edge, edge);
            }
        }
    }
}

function mergeMatrices(arena, player) {
    for (let y = 0; y < player.matrix.length; y++) {
        for (let x = 0; x < player.matrix[y].length; x++) {
            if (player.matrix[y][x] != 0) {
                arena[y + player.y][x + player.x] = player.matrix[y][x];
            }
        }
    }
}

function collide(arena, player) {
    for (let y = 0; y < player.matrix.length; y++) {
        for (let x = 0; x < player.matrix[0].length; x++) {
            if(player.matrix[y][x] != 0 && (arena[y + player.y] && arena[y + player.y][x + player.x]) != 0) {
                return true;
            }
        }
    }
    return false;
}

function arenaSweep() {
    let rowCount = 1;
    for (let y = 0; y < arena.length; y++) {
        let full = 1;
        for (let x = 0; x < arena[y].length; x++) {
            if (arena[y][x] == 0) {
                full = 0;
                break;
            }
        }
        if (full != 1) continue;
        arena.splice(y, 1);
        arena.unshift(new Array(width / edge).fill(0));

        rowCount++;
    }
    
    switch(rowCount) {
        case 1:
            player.score += 40 * (level + 1);
            break;
        case 2:
            player.score += 100 * (level + 1);
            break;
        case 3:
            player.score += 300 * (level + 1);
            break;
        case 4:
            player.score += 1200 * (level + 1);
            break;
    }
}

function createPiece(type) {
    switch (type) {
        case 0:
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
        case 1:
            return [
                [2, 2],
                [2, 2],
            ];
        case 2:
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3],
            ];
        case 3:
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0],
            ];
        case 4:
            return [
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
            ];
        case 5:
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ];
        case 6:
            return [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0],
            ];
    }
}

function Player() {
    this.x = 0;
    this.y = 0
    this.matrix = null;
    this.nextPiece = createPiece(Math.floor(Math.random() * 7));
    this.score = 0;

    this.newPiece = function () {
        this.x = (width / edge) / 2 - 1;
        this.y = 0;
        this.matrix = this.nextPiece;
        this.nextPiece = createPiece(Math.floor(Math.random() * 7));
        if (collide(arena, player)) {
            for (let i = 0; i < arena.length; i++) {
                arena[i].fill(0);
            }
        }
        this.updateScore();
    }

    this.drop = function () {
        this.y++;
        if (collide(arena, this)) {
            this.y--; // recovery
            mergeMatrices(arena, this);
            arenaSweep()
            this.newPiece();
        }
        time = millis();
    }

    this.rotate = function () {
      this.transpose();
      this.rotate90Degrees();
    }

    this.transpose = function () {
        let dimension = this.matrix.length
        let aux = Array.from(new Array(dimension), e => Array.from(new Array(dimension), x => null) )
        this.matrix.forEach( (x, i) => x.forEach( (e, j) => aux [j][i] = e))
        this.matrix = aux
    }

    this.rotate90Degrees = function() {
        this.matrix.reverse()[0].map((column, index) =>
            this.matrix.map(row => row[index])
          )
    }

    this.updateScore = function () {
        document.getElementById("score").innerText = this.score;
    }
}
