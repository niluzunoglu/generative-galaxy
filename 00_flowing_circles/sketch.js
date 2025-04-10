let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 0; i < 100; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(10, 80),
      speedX: random(-0.5, 0.5),
      speedY: random(-0.5, 0.5),
      color: color(random(100, 255), random(100, 255), random(100, 255), 100)
    });
  }
}

function draw() {
  background(0, 15); // Soft trail effect
  for (let c of circles) {
    fill(c.color);
    ellipse(c.x, c.y, c.size);
    c.x += c.speedX;
    c.y += c.speedY;

    // Wrap around edges
    if (c.x > width) c.x = 0;
    if (c.x < 0) c.x = width;
    if (c.y > height) c.y = 0;
    if (c.y < 0) c.y = height;
  }
}

// 💾 Ekran görüntüsünü kaydet
function keyPressed() {
  if (key === 's' || key === 'S') {
    let timestamp = Date.now();
    saveCanvas('flowing-circles-' + timestamp, 'png');
  }
}
