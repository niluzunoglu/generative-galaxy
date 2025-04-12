let layers = 8;
let noiseScale = 0.005;
let paletteDay, paletteNight;
let isDay = true;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(30);

  paletteDay = ['#FDEBD0', '#FAD7A0', '#F5B041', '#DC7633', '#A04000'];
  paletteNight = ['#0b132b', '#1c2541', '#3a506b', '#5bc0be', '#6fffe9'];

  drawSky();
}

function draw() {
  drawSky();
  drawLandscape();
  t += 0.002;
}

function drawSky() {
  if (isDay) {
    background('#87CEEB'); // açık mavi gökyüzü
    drawSun();
  } else {
    background('#0b0c10'); // gece
    drawStars();
    drawMoon();
  }
}

function drawLandscape() {
  let currentPalette = isDay ? paletteDay : paletteNight;

  for (let l = 0; l < layers; l++) {
    let c = color(currentPalette[l % currentPalette.length]);
    c.setAlpha(200 - l * 20);
    fill(c);

    beginShape();
    for (let x = 0; x <= width; x += 10) {
      let y = map(noise(x * noiseScale, t + l * 0.3), 0, 1, height * 0.3, height * 0.9);
      vertex(x, y - l * 20);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
}

function drawSun() {
  fill('#FFD700');
  noStroke();
  ellipse(width - 100, 100, 80, 80);
}

function drawMoon() {
  fill(255, 255, 255, 220);
  noStroke();
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
    saveCanvas('generative-landscape-' + Date.now(), 'png');
  } else if (key === 'm' || key === 'M') {
    isDay = !isDay;
  }
}
