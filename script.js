import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.querySelector("#ball"));
const playerPaddle = new Paddle(document.querySelector("#player-paddle"));
const computerPaddle = new Paddle(document.querySelector("#computer-paddle"));
const playerScoreElem = document.querySelector("#player-score");
const computerScoreElem = document.querySelector("#computer-score");

let keysPressed = [];
const KEY_UP = "ArrowUp";
const KEY_W = "w";
const KEY_DOWN = "ArrowDown";
const KEY_S = "s";

let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);

    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + delta * 0.0075);

    if (isLose()) {
      console.log("lost");
      handleLose();
    }

    if (keysPressed[KEY_UP]) {
      playerPaddle.update(delta, "up");
    }
    if (keysPressed[KEY_DOWN]) {
      playerPaddle.update(delta, "down");
    }
    if (keysPressed[KEY_W]) {
      computerPaddle.update(delta, "up");
    }
    if (keysPressed[KEY_S]) {
      computerPaddle.update(delta, "down");
    }
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();

  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }

  ball.reset();
  //   playerPaddle.reset();
  //   computerPaddle.reset();
}

document.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keysPressed[e.key] = false;
});

window.requestAnimationFrame(update);
