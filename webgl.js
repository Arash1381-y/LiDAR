///////// P5.js ////////////////////
let delta = 0.01;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent("normal-view-container");
  debugMode(GRID, GRID_SIZE, GRID_DIV, 0, 0, 0);
  camera = createCamera();
  camera.setPosition(...DEFAULT_CAMERA_POS);
  camera.lookAt(0, -50, 0);
}
function draw() {
  background(255);
  if (keyIsDown(LEFT_ARROW)) {
    camera.pan(delta * 1.5);
    lidarMap.updatePlayerLocation();
  } else if (keyIsDown(RIGHT_ARROW)) {
    camera.pan(-1 * delta * 1.5);
    lidarMap.updatePlayerLocation();
  } else if (keyIsDown(UP_ARROW)) {
    camera.move(0, 0, -150 * delta);
    lidarMap.updatePlayerLocation();
  } else if (keyIsDown(DOWN_ARROW)) {
    camera.move(0, 0, 150 * delta);
    lidarMap.updatePlayerLocation();
  }

  let r_x = 0, r_y = 0, r_z = 0;
  objects.forEach(o => {
    fill(...o.color);
    translate(o.x - r_x, o.y - r_y, o.z - r_z);
    r_x = o.x;
    r_y = o.y;
    r_z = o.z;
    // noStroke();
    box(o.size);
  })
}
