//Canvas
const canvas = document.getElementById("canv");
canvas.width = 400;
//Context
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.95);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);
car.draw(ctx);

animate();

function animate() {
  car.update();
  // Resizing canvas makes it clear
  canvas.height = window.innerHeight;
  ctx.save();
  //Fixing camera on a car
  ctx.translate(0, -car.y + canvas.height * 0.7);
  road.draw(ctx);
  car.draw(ctx);
  ctx.restore();
  //Recalling animate function
  requestAnimationFrame(animate);
}
