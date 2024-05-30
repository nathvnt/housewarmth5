const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;

let snake = [{ x: gridSize * 2, y: 0 }, { x: gridSize, y: 0 }, { x: 0, y: 0 }];
let direction = { x: gridSize, y: 0 };
let food = { x: gridSize * 5, y: gridSize * 5 };
let score = 0;
let gameOver = false;
let gameLoopInterval;

let gradientPosition = 0;

document.getElementById("startButton").addEventListener("click", startGame);

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Update gradient position
  gradientPosition += 0.5;
  if (gradientPosition >= 400) gradientPosition = 0;

  // Create gradient
  const gradient = ctx.createLinearGradient(
    gradientPosition, 0,
    gradientPosition + 400, 0
  );
  gradient.addColorStop(0, "#0a0a0a");
  gradient.addColorStop(0.2, "#3f3f46");
  gradient.addColorStop(0.4, "#065f46");
  gradient.addColorStop(0.6, "#4c1d95");
  gradient.addColorStop(0.8, "#059669");
  gradient.addColorStop(1, "#4f46e5");

  // Draw the snake
  ctx.fillStyle = gradient;
  for (let segment of snake) {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  }

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  // Draw the score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);

  // Draw game over text
  if (gameOver) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(`Game Over!`, canvasSize / 4, canvasSize / 2 - 20);
    ctx.fillText(`Score: ${score}`, canvasSize / 3, canvasSize / 2 + 20);

    document.getElementById("startButton").style.display = "block";
  }
}

function update() {
  const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check for collisions with walls
  if (
    newHead.x < 0 ||
    newHead.x >= canvasSize ||
    newHead.y < 0 ||
    newHead.y >= canvasSize
  ) {
    endGame();
    return;
  }

  // Check for collisions with itself
  for (let segment of snake) {
    if (newHead.x === segment.x && newHead.y === segment.y) {
      endGame();
      return;
    }
  }

  snake.unshift(newHead);

  // Check for food collision
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
  };

  // Ensure food is not placed on the snake
  for (let segment of snake) {
    if (food.x === segment.x && food.y === segment.y) {
      placeFood();
      break;
    }
  }
}

function resetGame() {
  snake = [{ x: gridSize * 2, y: 0 }, { x: gridSize, y: 0 }, { x: 0, y: 0 }];
  direction = { x: gridSize, y: 0 };
  score = 0;
  gameOver = false;
  placeFood();
  draw();
}

function startGame() {
  document.getElementById("startButton").style.display = "none";
  resetGame();
  gameLoopInterval = setInterval(gameLoop, 100);
}

function endGame() {
  gameOver = true;
  clearInterval(gameLoopInterval);
  draw();
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "ArrowUp" && direction.y === 0) {
    direction = { x: 0, y: -gridSize };
  } else if (key === "ArrowDown" && direction.y === 0) {
    direction = { x: 0, y: gridSize };
  } else if (key === "ArrowLeft" && direction.x === 0) {
    direction = { x: -gridSize, y: 0 };
  } else if (key === "ArrowRight" && direction.x === 0) {
    direction = { x: gridSize, y: 0 };
  }
});

function gameLoop() {
  if (!gameOver) {
    update();
    draw();
  }
}
