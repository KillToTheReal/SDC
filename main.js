//Canvas
const canvas = document.getElementById("canv");
canvas.width = 200;
//Context
const ctx = canvas.getContext("2d");

const car = new Car(100, 100, 30, 50);
car.draw(ctx);

animate();

function animate() {
  car.update();
  // Resizing canvas makes it clear
  canvas.height = window.innerHeight;
  car.draw(ctx);
  //Recalling animate function
  requestAnimationFrame(animate);
}
