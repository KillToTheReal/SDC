//Canvas
const carCanvas = document.getElementById("canv");
carCanvas.width = 200;
const networkCanvas = document.getElementById("netCanv");
networkCanvas.width = 400;
//Context
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.95);
// Cars generation amount
const N = 500;
const cars = generateCars(N);
let bestCar = cars[0];

if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.15);
    }
  }
}

const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(1), -800, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(2), -1200, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(2), -1500, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(0), -1500, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(0), -1200, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(1), -1900, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(2), -970, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(0), -950, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
];
animate();

function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
  localStorage.removeItem("bestBrain");
}

function generateCars(N) {
  const cars = [];
  for (let i = 1; i <= N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
  }
  return cars;
}

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  for (i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }

  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));
  // Resizing canvas makes it clear
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;
  carCtx.save();
  //Fixing camera on a  best car
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);
  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "red");
  }
  carCtx.globalAlpha = 0.2;
  for (i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx, "blue");
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, "blue", true);
  carCtx.restore();
  networkCtx.lineDashOffset = -time / 80;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);
  //Recalling animate function
  requestAnimationFrame(animate);
}
