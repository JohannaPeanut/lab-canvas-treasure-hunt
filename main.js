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
    this.direction = 'down';
  }
  moveUp() {
    this.direction = 'up';
    if (this.col > 0) this.col -= size;
  }
  moveRight() {
    this.direction = 'right';
    if (this.row < 9 * size) this.row += size;
  }
  moveDown() {
    this.direction = 'down';
    if (this.col < 9 * size) this.col += size;
  }
  moveLeft() {
    this.direction = 'left';
    if (this.row > 0) this.row -= size;
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

const drawTreasure = () => {
  treasure.setRandomPosition();
  treasureImage.addEventListener('load', () => {
    context.drawImage(treasureImage, treasure.row, treasure.col, 50, 50);
  });
};

const drawPlayer = (character) => {
  switch (character.direction) {
    case 'down':
      playerImage.src = 'images/character-down.png';
      break;
    case 'up':
      playerImage.src = 'images/character-up.png';
      break;
    case 'left':
      playerImage.src = 'images/character-left.png';
      break;
    case 'right':
      playerImage.src = 'images/character-right.png';
      break;
  }
  context.drawImage(playerImage, character.row, character.col);
};

const clean = (row, col) => {
  context.clearRect(row + 2, col + 2, size - 4, size - 4);
};

function drawEverything() {
  drawGrid();
  playerImage.addEventListener('load', () => {
    drawPlayer(player);
  });
  playerImage.addEventListener('load', () => {
    drawPlayer(secondPlayer);
  });
  drawTreasure();
}

const player = new Character(0, 0);

const secondPlayer = new Character(size, size);

const treasure = new Treasure();

const playerImage = new Image();

const treasureImage = new Image();
treasureImage.src = 'images/treasure.png';

window.addEventListener('keydown', (event) => {
  // Stop the default behavior (moving the screen to the left/up/right/down)
  event.preventDefault();

  switch (event.keyCode) {
    case 37:
      clean(player.row, player.col);
      player.moveLeft();
      drawPlayer(player);
      break;
    case 38:
      clean(player.row, player.col);
      player.moveUp();
      drawPlayer(player);
      break;
    case 39:
      clean(player.row, player.col);
      player.moveRight();
      drawPlayer(player);
      break;
    case 40:
      clean(player.row, player.col);
      player.moveDown();
      drawPlayer(player);
      break;
  }

  switch (event.keyCode) {
    case 65:
      clean(secondPlayer.row, secondPlayer.col);
      secondPlayer.moveLeft();
      drawPlayer(secondPlayer);
      break;
    case 87:
      clean(secondPlayer.row, secondPlayer.col);
      secondPlayer.moveUp();
      drawPlayer(secondPlayer);
      break;
    case 68:
      clean(secondPlayer.row, secondPlayer.col);
      secondPlayer.moveRight();
      drawPlayer(secondPlayer);
      break;
    case 83:
      clean(secondPlayer.row, secondPlayer.col);
      secondPlayer.moveDown();
      drawPlayer(secondPlayer);
      break;
  }
});

drawEverything();

// since secondPlayer: both players are invisible when I load page - why?
// why are some grid lines more bold?

// to do:
// treasure invisible?
// player score
// effect when treasure found?
