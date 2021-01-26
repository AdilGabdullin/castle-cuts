const green = "rgb(0,255,0)",
  fill = "black";

function Svg({ width, height, castle, arc, greenLines, letters }) {
  return h(
    "svg",
    { width, height, xmlns: "http://www.w3.org/2000/svg" },
    h("rect", { width, height, fill }),
    Polygon(castle),
    h("path", { d: arc.path, fill, stroke: "blue" }),
    Line(arc.lines[0], "blue"),
    Line(arc.lines[1], "blue"),
    Letter(arc.letter, "blue"),
    greenLines.map((l) => Line(l)),
    letters.map((x) => Letter(x))
  );
}

function Polygon(points) {
  return h("polygon", {
    fill,
    stroke: "yellow",
    points: points
      .map((p) => p[0].toFixed(2) + "," + p[1].toFixed(2))
      .join(" "),
  });
}

function Line([key, x1, y1, x2, y2], stroke = green) {
  return h("line", {
    key,
    id: key,
    x1: x1.toFixed(2),
    y1: y1.toFixed(2),
    x2: x2.toFixed(2),
    y2: y2.toFixed(2),
    stroke,
  });
}

function Letter({ key, x, y, text }, stroke = green) {
  return h("text", { key, x, y, fill: stroke, stroke }, text);
}
