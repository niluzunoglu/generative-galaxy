let t = 0;
let isDay = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(30);
}

function draw() {
  drawSky();
  drawSea();
  t += 0.01;
}

function drawSky() {
  if (isDay) {
    background('#87CEEB'); // Gündüz gökyüzü
    drawSun();
  } else {
    background('#0b0c10'); // Gece gökyüzü
    drawMoon();
    drawStars();
  }
}

function drawSea() {
  noStroke();
  for (let y = height * 0.5; y < height; y += 2) {
    let waveHeight = map(noise(y * 0.01, t), 0, 1, -10, 10);
    let seaColor = isDay ? color(0, 105, 148, 200) : color(0, 40, 80, 200);
    fill(seaColor);
    rect(0, y + waveHeight, width, 2);
  }
}

function drawSun() {
  fill('#FFD700');
  ellipse(width - 100, 100, 80, 80);
}

function drawMoon() {
  fill(255, 255, 255, 220);
  ellipse(width - 120, 100, 60, 60);
}

function drawStars() {
  for (let i = 0; i < 100; i++) {
    fill(255, 255, 255, random(100, 255));
    ellipse(random(width), random(height * 0.5), random(1, 3));
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('generative-sea-' + Date.now(), 'png');
  } else if (key === 'm' || key === 'M') {
    isDay = !isDay;
  }
}
