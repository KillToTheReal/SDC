class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.controls = new Controls();

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.03;
    this.angle = 0;
  }

  update() {
    this.#move();
  }

  #move() {
    // Forward / Reverse
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    //Not getting infinitely fast
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    //Implementing friction to not stop instantly
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }

    //No dragging forward bc of friction
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    /* IMPORTANT TO REMEMBER WHEN WORKING WITH ANGLES
         Because of x and y rotation in canvas, our unit circle is rotated
         90deg left, as:
              0
         Pi/2   -Pi/2
              Pi
      */
    //Flipping the controls backwards when reverse driving
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;

      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    //Changing car position in correlation with angle and speed
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    ctx.beginPath();
    // we don't need x and y in rect because we are translating to this point already
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();

    ctx.restore();
  }
}
