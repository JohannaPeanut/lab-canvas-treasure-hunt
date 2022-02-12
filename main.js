// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const size = width / 10;

const randomBetweenIntegers = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

let x = 0;
let y = 0;

context.strokeStyle = 'black';
context.lineWidth = 1;

// Iteration 1
function drawGrid() {
  for (let i = 0; i < 11; i++) {
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
    x += size;
  }
  for (let j = 0; j < 11; j++) {
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
    y += size;
  }
}

class Character {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
  moveUp() {
    this.col -= size;
  }
  moveRight() {
    this.row += size;
  }
  moveDown() {
    this.col += size;
  }
  moveLeft() {
    this.row -= size;
  }
}

class Treasure {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
  setRandomPosition() {
    this.col = randomBetweenIntegers(0, 9) * size;
    this.row = randomBetweenIntegers(0, 9) * size;
  }
}

const player = new Character(0, 0);

const treasure = new Treasure();

const playerImage = new Image();
playerImage.src = 'images/character-down.png';

const treasureImage = new Image();
treasureImage.src = 'images/treasure.png';

const drawTreasure = () => {
  treasure.setRandomPosition();
  treasureImage.addEventListener('load', () => {
    context.drawImage(treasureImage, treasure.row, treasure.col, 50, 50);
  });
};

const drawPlayer = () => {
  playerImage.addEventListener('load', () => {
    context.drawImage(playerImage, player.row, player.col);
  });
};

function drawEverything() {
  drawGrid();
  drawPlayer();
  drawTreasure();
}

document.addEventListener('keydown', (event) => {
  // Stop the default behavior (moving the screen to the left/up/right/down)
  event.preventDefault();
  const keyCode = event.keyCode;
  // React based on the key pressed
  switch (keyCode) {
    case 37:
      player.moveLeft();
      drawPlayer();
      break;
    case 38:
      player.moveUp();
      drawPlayer();
      break;
    case 39:
      player.moveRight();
      drawPlayer();
      break;
    case 40:
      player.moveDown();
      drawPlayer();
      break;
  }
});

drawEverything();
