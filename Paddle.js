const PADDLE_VELOCITY = 0.07;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--posY")
    );
  }

  set position(val) {
    this.paddleElem.style.setProperty("--posY", val);
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  reset() {
    this.position = 50;
  }

  update(delta, direction) {
    const rect = this.rect();

    switch (direction) {
      case "up":
        if (rect.top > 0) {
          this.position -= PADDLE_VELOCITY * delta;
        }
        break;
      case "down":
        if (rect.bottom < window.innerHeight) {
          this.position += PADDLE_VELOCITY * delta;
        }
        break;

      default:
        break;
    }
  }
}
