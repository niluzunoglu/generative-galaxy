let cols, rows;
let cellSize = 80;
let palette = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  initPalette();
  drawNewGrid();
}

function initPalette() {
  // Pastel renk paleti
  palette = [
    color(255, 179, 186),
    color(255, 223, 186),
    color(255, 255, 186),
    color(186, 255, 201),
    color(186, 225, 255)
  ];
}

function drawNewGrid() {
  background(0);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellSize;
      let y = j * cellSize;

      // Gürültüye bağlı büyüklük
      let noiseVal = noise(i * 0.3, j * 0.3);
      let shapeSize = map(noiseVal, 0, 1, cellSize * 0.4, cellSize * 0.8);

      // Renk paletinden rastgele bir renk seç
      fill(random(palette));

      // Rastgele şekil
      if (random() < 0.5) {
        rect(x, y, shapeSize, shapeSize);
      } else {
        ellipse(x + cellSize / 2, y + cellSize / 2, shapeSize);
      }
    }
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    let timestamp = Date.now();
    saveCanvas('random-grid-' + timestamp, 'png');
  } else {
    drawNewGrid(); // Her tuşa basışta yeni grid
  }
}
