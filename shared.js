let topView = false;
let topViewText = "Top View";
let normalViewText = "Normal View";

const toggleButtonId = "camera-toggle";
let toggleButton;

const topViewCanvasId = "top-view-container";
let topViewCanvas;

const normalViewCanvasId = "normal-view-container";
let normalViewCanvas;

const brownColor = [165, 42, 42];

///////////// GRID SIZE ///////////////
const GRID_DIV = 30;

// let GRID_SIZE = 1000;
// let SQUERE_SIZE = GRID_SIZE / GRID_DIV;
let GRID_SIZE, SQUERE_SIZE;

let canvas_squere_size;
///////////////////////////////////////


const DEFAULT_CAMERA_POS = [0, -100, 500];
let camera;
let lidarMap;

let objects;

function scene1() {

    objects = [
      // right obstacle
    { x: SQUERE_SIZE, y: -0.5 * SQUERE_SIZE, z: -300 - SQUERE_SIZE, size: SQUERE_SIZE, color: [100, 120, 52] },
    { x: 0, y: -0.5 * SQUERE_SIZE, z: -300 - SQUERE_SIZE, size: SQUERE_SIZE, color: [100, 120, 52] },
    { x: SQUERE_SIZE, y: -1.5 * SQUERE_SIZE, z: -300 - SQUERE_SIZE, size: SQUERE_SIZE, color: [100, 120, 52] },
    { x: 0, y: -1.5 * SQUERE_SIZE, z: -300 - SQUERE_SIZE, size: SQUERE_SIZE, color: [100, 120, 52] },

    { x: SQUERE_SIZE * -1, y: -0.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [0, 0, 0] },
    // { x: -1 * SQUERE_SIZE, y: -1.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: 0, y: -0.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: 0, y: -1.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: 0, y: -2.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: SQUERE_SIZE, y: -2.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: -1 * SQUERE_SIZE, y: -2.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    ]
}

let scenes = [
    objects = [
    { x: SQUERE_SIZE, y: -0.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: -1 * SQUERE_SIZE, y: -1.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: 0, y: -0.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: 0, y: -1.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: 0, y: -2.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: SQUERE_SIZE, y: -2.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: -1 * SQUERE_SIZE, y: -2.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    ]
]

function signs() {

    objects = [
    { x: 0, y: -0.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: 0, y: -1.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: 0, y: -2.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: SQUERE_SIZE, y: -2.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    { x: -1 * SQUERE_SIZE, y: -2.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 255, 0] },
    ]
}

function light() {
  let color = [255, 0, 0]
  setInterval(() => {
    if (color[0] == 255) {
        color[0] = 0
        color[1] = 255
    } else {
        color[1] = 0
        color[0] = 255
    }
  }, 3000)

    objects = [
    { x: 0, y: -0.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: color },
    { x: SQUERE_SIZE, y: -0.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: color },
    { x: 0, y: -0.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: color },
    { x: 0, y: -1.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: color },
    { x: SQUERE_SIZE, y: -1.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: color },
    { x: 0, y: -0.5 * SQUERE_SIZE, z: -300 + SQUERE_SIZE, size: SQUERE_SIZE, color: color },
    { x: SQUERE_SIZE, y: -0.5 * SQUERE_SIZE, z: -300 + SQUERE_SIZE, size: SQUERE_SIZE, color: color },
    { x: 0, y: -0.5 * SQUERE_SIZE, z: -300 + SQUERE_SIZE, size: SQUERE_SIZE, color: color },
    { x: 0, y: -1.5 * SQUERE_SIZE, z: -300 + SQUERE_SIZE, size: SQUERE_SIZE, color: color },
    { x: SQUERE_SIZE, y: -1.5 * SQUERE_SIZE, z: -300 + SQUERE_SIZE, size: SQUERE_SIZE, color: color },
    ]
}


class LidarMap {
  constructor(node, camera) {
    this.svg = node;
    this.camera = camera;
    this.objects = [];
    this.lidars = [];
    this.width = node.getAttribute("width");
    this.height = node.getAttribute("height");
    this.ratio = this.width / windowWidth;

    this.lidarContainer = null;
  }

  addPlayer() {
    const playerNode = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    playerNode.setAttribute("id", "player-loc");
    playerNode.setAttribute("r", `${15 * this.ratio}`);
    playerNode.setAttribute(
      "cx",
      DEFAULT_CAMERA_POS[0] * this.ratio + this.width / 2
    );
    playerNode.setAttribute(
      "cy",
      DEFAULT_CAMERA_POS[2] * this.ratio + this.height / 2
    );
    playerNode.setAttribute("fill", "blue");
    this.addNode(playerNode);
    this.playerNode = playerNode;
  }

  addObject(obj) {
    const node = document.createElementNS(
      "http://www.w3.org/2000/svg",
      OBJECT_TYPE
    );

    node.setAttribute("id", `${OBJECT_TYPE}_${this.objects.length}`);

    const len = obj.size * this.ratio;

    node.setAttribute("width", len);
    node.setAttribute("height", len);

    const x = (obj.x - obj.size / 2) * this.ratio + this.width / 2;
    const y = (obj.z - obj.size / 2) * this.ratio + this.height / 2;
    node.setAttribute("x", x);
    node.setAttribute("y", y);

    // node.setAttribute("x", ((obj.x) * this.ratio) + this.width / 2);
    // node.setAttribute("y", ((obj.z) * this.ratio) + this.width / 2);
    // node.setAttribute("y", obj.z * this.ratio + this.width / 2);

    node.setAttribute("fill", `rgb(${obj.color})`);
    this.addNode(node);
    this.objects.push({size: len, x: x, y: y});
  }

  initLidarContainer(container) {
    this.lidarContainer = container;
    this.addNode(container);
  }

  addLidar(arc) {
    let node = document.createElementNS("http://www.w3.org/2000/svg", "path");

    // Check if the arc is a circle
    const isCircle =
      (((arc.endAngle - arc.startAngle) % 360) + 360) % 360 === 0;

    let d;
    if (isCircle) {
      node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      node.setAttribute("r", arc.radius);
      node.setAttribute("cx", this.getPlayerX());
      node.setAttribute("cy", this.getPlayerY());
    } else {
      // For a regular arc
      d = `M ${arc.x1} ${arc.y1} 
             A ${arc.radius} ${arc.radius} 0 
               0 1 
             ${arc.x2} ${arc.y2}`;
      node.setAttribute("d", d);
    }

    node.setAttribute("stroke", arc.stroke);
    node.setAttribute("stroke-width", "2px");
    node.setAttribute("fill", "none");

    console.log(node);

    this.lidarContainer.appendChild(node);
    this.lidars.push(arc);
  }

  addNode(node) {
    this.svg.appendChild(node);
  }

  getPlayerX() {
    return this.playerNode.getAttribute("cx");
  }

  getPlayerY() {
    return this.playerNode.getAttribute("cy");
  }

  updatePlayerLocation() {
    this.playerNode.setAttribute(
      "cx",
      camera.eyeX * this.ratio + this.width / 2
    );
    this.playerNode.setAttribute(
      "cy",
      camera.eyeZ * this.ratio + this.height / 2
    );
  }
}

window.onload = () => {
  GRID_SIZE = windowWidth;
  SQUERE_SIZE = GRID_SIZE / GRID_DIV;

  // TODO: move the decleration somewhere else
  const tree = [
    // { x: 0, y: -25, z: -100, size: 50, color: brownColor },
    // { x: 100, y: -20, z:100 , size: 40, color: brownColor },
    // { x: 200, y: -10, z: -100, size: 20, color: brownColor },
    {
      x: 0,
      y: ((-1 * SQUERE_SIZE) / 2) * 4,
      z: 0,
      size: SQUERE_SIZE * 4,
      color: [0, 255, 0],
    },
  ];

  objects = [
    // { x: 0, y: -0.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 0, 0] },
    // { x: 0, y: -1.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 0, 0] },
    // { x: 0, y: -2.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 0, 0] },
    // { x: SQUERE_SIZE, y: -2.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 0, 0] },
    // { x: -1 * SQUERE_SIZE, y: -2.5 * SQUERE_SIZE, z: -300, size: SQUERE_SIZE, color: [255, 0, 0] },
    // { x: 0, y: -1 * SQUERE_SIZE / 2, z: 300 + SQUERE_SIZE, size: SQUERE_SIZE, color: [255, 0, 0] },
    // { x: 100, y: -20, z: 0, size: 40, color: [255, 123, 32] },
    // { x: 200, y: -10, z: 0, size: 20, color: [121, 211, 112] },
    // ...tree,
  ];

  // toggleButton = document.getElementById(toggleButtonId);
  // toggleButton.textContent = !topView ? topViewText : normalViewText;

  topViewCanvas = document.getElementById(topViewCanvasId);
  normalViewCanvas = document.getElementById(normalViewCanvasId);

  const node = document.getElementById("lidar-map");

  lidarMap = new LidarMap(node, camera);
  createCheckerPattern(node);

  lidarMap.addPlayer();
  objects.map((obj) => lidarMap.addObject(obj));

  // set camera state
  const button = document.getElementById("camera-toggle");
  button.textContent = !topView ? topViewText : normalViewText;
};

const toggleCamera = () => {
  if (topView) {
    topViewCanvas.style.display = "none";
    normalViewCanvas.style.display = "block";
  } else {
    topViewCanvas.style.display = "block";
    normalViewCanvas.style.display = "none";
  }

  toggleButton.textContent = !topView ? topViewText : normalViewText;
  topView = !topView;
};

const createCheckerPattern = (svg) => {
  const width = svg.getAttribute("width");
  const height = svg.getAttribute("height");

  canvas_squere_size = width / GRID_DIV;
  // Clear previous content
  svg.innerHTML = "";

  // Define the pattern
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const pattern = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "pattern"
  );
  pattern.setAttribute("id", "checkered");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", canvas_squere_size);
  pattern.setAttribute("height", canvas_squere_size);

  // Create lines for the pattern
  const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line1.setAttribute("x1", 0);
  line1.setAttribute("y1", 0);
  line1.setAttribute("x2", canvas_squere_size);
  line1.setAttribute("y2", 0);
  line1.setAttribute("stroke", "black");
  line1.setAttribute("stroke-width", 0.5);

  const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line2.setAttribute("x1", 0);
  line2.setAttribute("y1", 0);
  line2.setAttribute("x2", 0);
  line2.setAttribute("y2", canvas_squere_size);
  line2.setAttribute("stroke", "black");
  line2.setAttribute("stroke-width", 0.5);

  // Append lines to the pattern
  pattern.appendChild(line1);
  pattern.appendChild(line2);
  defs.appendChild(pattern);
  svg.appendChild(defs);

  // Use the pattern as a background
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("width", "100%");
  rect.setAttribute("height", "100%");
  rect.setAttribute("fill", "url(#checkered)");
  svg.appendChild(rect);
};
