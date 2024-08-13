const OBJECT_COLOR = "#b6d094";
const LIDAR_TYPE = "circle";
const OBJECT_TYPE = "rect";

const activateLidar = () => {
  const totalCircles = 1; // Total number of circles to create
  let currentCircle = 0; // Counter for the current circle

  const node = document.createElementNS("http://www.w3.org/2000/svg", "g");

  lidarMap.initLidarContainer(node);

  const interpolateColor = (value, min, max) => {
    if (min == max) return `rgb(0, 255, 0)`;
    // Normalize the value to a range between 0 and 1
    const normalized = (value - min) / (max - min);
    // Calculate the red and green components
    const red = Math.round(255 * (1 - normalized)); // Red decreases as value increases
    const green = Math.round(255 * normalized); // Green increases as value increases
    return `rgb(${red}, ${green}, 0)`; // Return the color in rgb format
  };

  const playerX = Number(lidarMap.getPlayerX());
  const playerY = Number(lidarMap.getPlayerY());

  const addCircle = (currentCircle, partitions) => {
    const Flatten = globalThis["@flatten-js/core"];
    const { point, circle, segment, Arc } = Flatten;

    if (currentCircle < totalCircles) {
      const radius = (currentCircle + 1) * 50;
      const strokeColor = interpolateColor(radius, 10, totalCircles * 10); // Interpolate color based on radius

      partitions.forEach((partition) => {
        const startAngle = partition[0];
        const endAngle = partition[1];

        const center = point(playerX, playerY);
        const pArc = new Arc(center, radius, startAngle, endAngle, 1);

        const points = [];
        lidarMap.objects.forEach((obj) => {
          const x = obj.x;
          const y = obj.y;
          const len = obj.size;
          p1 = point(x, y);
          p2 = point(x + len, y);
          p3 = point(x, y + len);
          p4 = point(x + len, y + len);

          s1 = segment(p1, p2);
          s2 = segment(p1, p3);
          s3 = segment(p2, p3);
          s4 = segment(p3, p4);

          points.push(...pArc.intersect(s1));
          points.push(...pArc.intersect(s2));
          points.push(...pArc.intersect(s3));
          points.push(...pArc.intersect(s4));
        });

        console.log(p1, p2, p3, p4);
        console.log(points);

        

        const arc = {
          x1: playerX + radius * Math.cos((startAngle * Math.PI) / 180),
          y1: playerY + radius * Math.sin((startAngle * Math.PI) / 180),
          x2: playerX + radius * Math.cos((endAngle * Math.PI) / 180),
          y2: playerY + radius * Math.sin((endAngle * Math.PI) / 180),
          radius: radius,
          stroke: strokeColor,
        };

        lidarMap.addLidar(arc);
      });

      currentCircle++; // Increment the circle counter
      setTimeout(() => addCircle(currentCircle, partitions), 500); // Call addCircle again after 500 milliseconds
    }
  };

  addCircle(currentCircle, [[180, 360]]);
};
