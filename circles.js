
let ballSize = 0
let numBalls = 40
let colorScale = 0xff / numBalls

// holds positions of all balls
let xs = new Array(numBalls)
let ys = new Array(numBalls)

// used for weighted averaging of motion
let motionWeight = 0.05
let calcWeight = 1.0 - motionWeight

function setup() {
  createCanvas(windowWidth, windowHeight)
  ballSize = windowWidth / 6;
  for (let i = 0; i < numBalls; i++) {
    xs[i] = width / 2
    ys[i] = height / 2
  }
}

function draw() {
  background(255)
  noStroke()
  for (let i = 0; i < numBalls; i++) {
    let color = 255 - (i * colorScale)
    fill(color);
    let mx = mouseX / width * i
    let my = mouseY / height * i
    console.log(mx);
    let calcX = (Math.sin(Math.sin(mx)) + 1) * (width / 2) + mx
    let calcY = (Math.sin(my) + 1) * (height / 2) + my

    // weighted average for smooth motion
    xs[i] = (xs[i] * calcWeight) + (calcX * motionWeight)
    ys[i] = (ys[i] * calcWeight) + (calcY * motionWeight)

    // larger in the back
    let diam = ballSize - (1.5 * i)
    ellipse(xs[i], ys[i], diam, diam)
  }
}
