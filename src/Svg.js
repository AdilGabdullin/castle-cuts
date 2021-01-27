import React from "react";

const green = "rgb(0,255,0)",
  fill = "black";

export default function Svg({
  width,
  height,
  castle,
  arc,
  greenLines,
  letters,
}) {
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <rect width={width} height={height} fill={fill} />
      <Polygon points={castle} />
      <path d={arc.path} fill={fill} stroke="blue" />
      <Line params={arc.lines[0]} stroke="blue" />
      <Line params={arc.lines[1]} stroke="blue" />
      <Letter params={arc.letter} stroke="blue" />
      {greenLines.map((p, key) => (
        <Line key={key} params={p} />
      ))}
      {letters.map((p, key) => (
        <Letter key={key} params={p} />
      ))}
    </svg>
  );
}

function Polygon({ points }) {
  return (
    <polygon
      fill={fill}
      stroke={"yellow"}
      points={points
        .map((p) => p[0].toFixed(2) + "," + p[1].toFixed(2))
        .join(" ")}
    />
  );
}

function Line({ params, stroke = green }) {
  const [key, x1, y1, x2, y2] = params;
  return (
    <line
      key={key}
      id={key}
      x1={x1.toFixed(2)}
      y1={y1.toFixed(2)}
      x2={x2.toFixed(2)}
      y2={y2.toFixed(2)}
      stroke={stroke}
    />
  );
}

function Letter({ params, stroke = green }) {
  const { key, x, y, text } = params;
  return (
    <text
      key={key}
      x={x.toFixed(2)}
      y={y.toFixed(2)}
      fill={stroke}
      stroke={stroke}
    >
      {text}
    </text>
  );
}
