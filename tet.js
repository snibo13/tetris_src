//TODO: Level up mechanics
let totalRows = 0;
const edge = 30;
let rowIt = 0;
let time;
let highscore = false;
let hs = 0;
let player;
let level = 0;
let timer = 1000/ (level + 1);
let pause = false;
let arena = [];
const colors = [{
    r: 232,
    g: 63,
    b: 36
  }, //s Piece
  {
    r: 121,
    g: 172,
    b: 63
  }, //t Piece
  {
    r: 254,
    g: 247,
    b: 77
  }, //o
  {
    r: 246,
    g: 145,
    b: 52
  }, //l
  {
    r: 241,
    g: 109,
    b: 183
  }, //j
  {
    r: 82,
    g: 224,
    b: 252
  }, //i
  {
    r: 147,
    g: 57,
    b: 145
  } //z
]
let myFont;

//Failed fonts
/*function preload() {
  let myFont = loadFont("PressStart2P-Regular.ttf");
}*/


function setup() {
  createCanvas(10 * edge, 20 * edge);
  frameRate(25  + level * 5);
  player = new Player();
  player.newPiece();
  time = millis();
  textSize(32);
  // textFont(myFont);
  arena = new Array(20);
  for (let i = 0; i < arena.length; i++) {
    arena[i] = new Array(10).fill(0);
  }
}


function draw() {
  background(50);
  drawMatrix(arena, [0, 0]);
  drawMatrix(player.matrix, [player.x, player.y]);
  if ((millis() - time) > timer) {
    player.drop();
  }

  if(pause) {
    fill(255,255,255);
    textSize(32);
    text('PAUSED',edge * 2.5, edge * 9);
  }

  function gameover () {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 20; y++) {
        if (arena[y][x] === null) {
          break;
        }
        return true;
      }
    }
    return false;
  }
  if (player.gameover) {
    fill(255,255,255);
    textSize(32);
    text('Game Over', edge * 2, edge * 9);
    textSize(20);
    text('Press \'C\' to continue', edge * 2, edge * 11);
    if (newHighscore(player.score !== -1)) {
      fill(255,255,153);
      text('NEW HIGHSCORE!', edge * 2, edge * 7);
      document.getElementById("HighscoreModal").visibility = 'inherit';
    }
    noLoop();
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.dropFast();
  }

}

function keyPressed() {
  if (!pause) {
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
      if (player.x < 5) {
        player.x++;
      } else {
        player.x--;
      }
    }
    } else if (keyCode == 32) {
      while(!collide(arena, player)) {
        player.y++;
      }
      player.y--;
    }
  }
  if (keyCode == 67) {
    player.gameover = false;
    if (!player.gameover) {
      loop();
    }
  }
  if (!player.gameover) {
  if (keyCode == 80) {
    pause = !pause;
    if (pause) {
      noLoop();
    } else {
      loop();
    }
  }
  }

}

function drawMatrix(matrix, offset) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] !== 0) {
        stroke(255);
        strokeWeight(2);
        c = colors[matrix[y][x] - 1];
        fill(c.r, c.g, c.b);
        rect((x + offset[0]) * edge, (y + offset[1]) * edge-1, edge, edge);
      }
    }
  }
}

function mergeMatrices(arena, player) {
  for (let y = 0; y < player.matrix.length; y++) {
    for (let x = 0; x < player.matrix[y].length; x++) {
      if (player.matrix[y][x] !== 0) {
        arena[y + player.y][x + player.x] = player.matrix[y][x];
      }
    }
  }
}

function collide(arena, player) {
  for (let y = 0; y < player.matrix.length; y++) {
    for (let x = 0; x < player.matrix[0].length; x++) {
      if (player.matrix[y][x] !== 0 && (arena[y + player.y] && arena[y + player.y][x + player.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function arenaSweep() {
  let rowCount = 0;
  for (let y = 0; y < arena.length; y++) {
    let full = 1;
    for (let x = 0; x < arena[y].length; x++) {
      if (arena[y][x] === 0) {
        full = 0;
        break;
      }
    }
    if (full != 1) continue;
    arena.splice(y, 1);
    arena.unshift(new Array(width / edge).fill(0));

        rowCount++;
    }
    totalRows += rowCount;
    rowIt += rowCount;
    if (totalRows > 0 && (rowIt % 10) === 0) {
      rowIt = 0;
      level++;
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
  this.y = 0;
  this.matrix = createPiece(Math.floor(Math.random() * 7));
  this.nextPiece = null;
  this.score = 0;
  this.gameover = false;

  this.newPiece = function() {
    this.x = 4;
    this.y = 0;
    this.nextPiece = createPiece(Math.floor(Math.random() * 7));
    if(this.nextPiece == this.matrix) {
      this.nextPiece = createPiece(Math.floor(Math.random() * 7));
    }
    this.matrix = this.nextPiece;
    if (collide(arena, player)) {
      for (let i = 0; i < arena.length; i++) {
        arena[i].fill(0);
        this.gameover = true;
      }

      this.score = 0;
      totalRows = 0;
    }
    this.updateScore();
  }

  this.drop = function() {
    this.y++;
    if (collide(arena, this)) {
      this.y--; // recovery
      mergeMatrices(arena, this);
      arenaSweep();
      this.newPiece();
    }
    time = millis();
  }

  this.dropFast = function() {
    setTimeout( function() {console.log("drop")}, 1000);

    this.y++;
    if (collide(arena, this)) {
      this.y--; // recovery
      mergeMatrices(arena, this);
      arenaSweep();
      this.newPiece();
    }
    time = millis();

  }

  this.rotate = function() {
    if (this.matrix == createPiece(3) || this.matrix == createPiece(2)) {
      this.transpose();
      this.rotate90Degrees();
    } else {
    this.rotate90Degrees();
    this.transpose();
    }
  }

  this.transpose = function() {
    let dimension = this.matrix.length
    let aux = Array.from(new Array(dimension), e => Array.from(new Array(dimension), x => null))
    this.matrix.forEach((x, i) => x.forEach((e, j) => aux[j][i] = e))
    this.matrix = aux
  }

  this.rotate90Degrees = function() {
    this.matrix.reverse()[0].map((column, index) =>
      this.matrix.map(row => row[index])
    )
  }

  this.updateScore = function() {
    document.getElementById("score").innerText = this.score;
    document.getElementById("rows").innerText = totalRows;
    document.getElementById("level").innerText = level;
    }
}
