const canvasWidth = 300
const canvasHeight = 600
const backgroundColor = 50
const boxDimension = 30
const timeInterval = 500
const collisionMargin = 1
const marginPieceBeginning = 2
const startingPoints = 0
const begginingPoint = 0

const sPiece = [
  [null, null, null],
  [null,    1,    1],
  [1,       1, null]
]


const tPiece =[
  [null, null, null],
  [1,       1,    1],
  [null,    1, null],
];
const oPiece = [
  [1, 1],
  [1, 1],
];
const lPiece =  [
  [null, 1, null],
  [null, 1, null],
  [null, 1,    1],
];
const jPiece = [
  [null, 1, null],
  [null, 1, null],
  [1,    1, null],
];
const iPiece = [
  [null, 1, null, null],
  [null, 1, null, null],
  [null, 1, null, null],
  [null, 1, null, null],
];

const zPiece = [
  [1,       1, null],
  [null,    1,    1],
  [null, null, null],
];

const pieces = [sPiece, zPiece, oPiece, lPiece, jPiece, iPiece, tPiece]


/* Colors */

const colors = [
  {r: 232, g:  63, b:  36}, //s Piece
  {r: 121, g: 172, b:  63}, //t Piece
  {r: 254, g: 247, b:  77}, //o
  {r: 246, g: 145, b:  52},  //l
  {r: 241, g: 109, b: 183},  //j
  {r:  82, g: 224, b: 252},  //i
  {r: 147, g:  57, b: 145}
] //z
