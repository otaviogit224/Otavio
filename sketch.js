
let ball;
let playerPaddle;
let computerPaddle;
let playerScore = 0;
let computerScore = 0;
const paddleWidth = 3;
const paddleHeight = 75;
const ballSize = 12;
const ballSpeed = 7.5;
const computerPaddleSpeed = 1.5; // 

function setup() {
  createCanvas(600, 400);
  ball = {
    x: width / 2,
    y: height / 2,
    xSpeed: random() > 0.5 ? ballSpeed : -ballSpeed,
    ySpeed: random(-ballSpeed, ballSpeed),
  };
  playerPaddle = {
    x: paddleWidth,
    y: height / 2,
    speed: 10,
  };
  computerPaddle = {
    x: width - paddleWidth,
    y: height / 2,
    speed: computerPaddleSpeed,
  };
}

function draw() {
  background(0);


  drawNet();


  rect(playerPaddle.x, playerPaddle.y - paddleHeight / 2, paddleWidth, paddleHeight);
  rect(computerPaddle.x, computerPaddle.y - paddleHeight / 2, paddleWidth, paddleHeight);


  ellipse(ball.x, ball.y, ballSize, ballSize);

  moveBall();
  checkBallCollision();

  if (keyIsDown(UP_ARROW)) {
    playerPaddle.y -= playerPaddle.speed;
  } else if (keyIsDown(DOWN_ARROW)) {
    playerPaddle.y += playerPaddle.speed;
  }


  playerPaddle.y = constrain(playerPaddle.y, paddleHeight / 2, height - paddleHeight / 2);

  
  if (ball.y < computerPaddle.y) {
    computerPaddle.y -= computerPaddle.speed;
  } else if (ball.y > computerPaddle.y) {
    computerPaddle.y += computerPaddle.speed;
  }

   
  computerPaddle.y = constrain(computerPaddle.y, paddleHeight / 2, height - paddleHeight / 3);

  if (ball.x < 0) {
    computerScore++;
    resetBall();
  } else if (ball.x > width) {
    playerScore++;
    resetBall();
  }

  fill(255);
  textSize(32);
  text(playerScore, width / 4, 50);
  text(computerScore, (3 * width) / 4, 50);
}

 
function drawNet() {
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < height; i += 30) {
    line(width / 2, i, width / 2, i + 15);
  }
}

function moveBall() {
  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;
}

// 
function checkBallCollision() {
  if (
    ball.x - ballSize / 2 < playerPaddle.x + paddleWidth / 2 &&
    ball.x + ballSize / 2 > playerPaddle.x - paddleWidth / 2 &&
    ball.y > playerPaddle.y - paddleHeight / 2 &&
    ball.y < playerPaddle.y + paddleHeight / 2
  ) {
    ball.xSpeed *= -1;
  }

  if (
    ball.x - ballSize / 2 < computerPaddle.x + paddleWidth / 2 &&
    ball.x + ballSize / 2 > computerPaddle.x - paddleWidth / 2 &&
    ball.y > computerPaddle.y - paddleHeight / 2 &&
    ball.y < computerPaddle.y + paddleHeight / 2
  ) {
    ball.xSpeed *= -1;
  }

  // 
  if (ball.y - ballSize / 2 < 0 || ball.y + ballSize / 2 > height) {
    ball.ySpeed *= -1;
  }
}

// 
function resetBall() {
  ball.x = width / 2;
  ball.y = height / 2;
  ball.xSpeed = random() > 5.9 ? ballSpeed : -ballSpeed;
  ball.ySpeed = random(-ballSpeed, ballSpeed);
}
