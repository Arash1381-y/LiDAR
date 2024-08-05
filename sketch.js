const OBJECT_COLOR = "#b6d094";
const LIDAR_TYPE = "circle";
const OBJECT_TYPE = "rect";
let current_camera;

class LidarMap {
  constructor() {
    this.htmlNode = null;
    this.camera = null;
    this.objects = [];
    this.lidars = [];

    this.lidarNode = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
  }

  addObject(obj) {
    const node = document.createElementNS(
      "http://www.w3.org/2000/svg",
      OBJECT_TYPE
    );
    node.setAttribute("id", `${OBJECT_TYPE}_${this.objects.length}`);
    node.setAttribute("width", obj.width);
    node.setAttribute("height", obj.height);
    node.setAttribute("x", obj.x);
    node.setAttribute("y", obj.y);
    node.setAttribute("fill", obj.color);
    this.addNode(node);
    this.objects.push(obj);
  }

  addLidar(lidar) {
    const node = document.createElementNS(
      "http://www.w3.org/2000/svg",
      LIDAR_TYPE
    );
    node.setAttribute("id", `${LIDAR_TYPE}_${this.lidars.length}`);
    node.setAttribute("r", lidar.r);
    node.setAttribute("cx", lidar.cx);
    node.setAttribute("cy", lidar.cy);
    node.setAttribute("fill", "none");
    node.setAttribute("stroke", lidar.stroke);
    node.setAttribute("stroke-width", "2px");
    this.lidarNode.appendChild(node);
    this.lidars.push(lidar);
  }

  addNode(node) {
    this.htmlNode.appendChild(node);
  }

  addPlayer(position) {
    this.camera = position;
    const CameraNode = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    CameraNode.setAttribute("r", "10");
    CameraNode.setAttribute("cx", position.x);
    CameraNode.setAttribute("cy", position.y);
    CameraNode.setAttribute("fill", "yellow");
    lidarMap.addNode(CameraNode);
  }
}

const lidarMap = new LidarMap();
const objects = [
  { x: "250", y: "150", width: "100", height: "100", color: OBJECT_COLOR },
];

window.onload = () => {
  const node = document.getElementById("lidar-map");
  lidarMap.htmlNode = node;
  lidarMap.addNode(lidarMap.lidarNode);

  objects.map((obj) => lidarMap.addObject(obj));

  const position = { x: "50%", y: "50%" };
  lidarMap.addPlayer(position);
};

const activateLidar = () => {
  const totalCircles = 25; // Total number of circles to create
  let currentCircle = 0; // Counter for the current circle

  const interpolateColor = (value, min, max) => {
    // Normalize the value to a range between 0 and 1
    const normalized = (value - min) / (max - min);
    // Calculate the red and green components
    const red = Math.round(255 * (1 - normalized)); // Red decreases as value increases
    const green = Math.round(255 * normalized); // Green increases as value increases
    return `rgb(${red}, ${green}, 0)`; // Return the color in rgb format
  };

  const addCircle = (currentCircle) => {
    if (currentCircle < totalCircles) {
      const radius = (currentCircle + 1) * 10;
      const strokeColor = interpolateColor(radius, 10, totalCircles * 10); // Interpolate color based on radius

      const circle = {
        r: radius,
        cx: lidarMap.camera.x,
        cy: lidarMap.camera.y,
        fill: "none",
        stroke: strokeColor,
      };
      lidarMap.addLidar(circle);

      currentCircle++; // Increment the circle counter
      setTimeout(() => addCircle(currentCircle), 500); // Call addCircle again after 500 milliseconds
    }
  };

  addCircle(currentCircle); // Start the process
};

// const clearObjects = () => {
//   lidarMap.lidarNode.innerHTML = "";
// };

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  describe("A red box on a white background.");
  debugMode();
  cam = createCamera();
  cam.setPosition(0, -200, 800);
  cam.lookAt(0, 0, 0);
}
function draw() {
  // draw a box 100 units to the right
  fill(255, 0, 0);
  translate(0, 0, 0);
  box();
}

function keyPressed() {}
