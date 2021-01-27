import React, { useState } from "react";
import Form from "./Form";
import Svg from "./Svg";
import mapValues from "lodash-es/mapValues";

export default function App({ values }) {
  const initState = mapValues(values, (v) => ({ value: v, valid: !isNaN(+v) })),
    [state, setState] = useState(initState),
    onChange = ({ target }) => {
      const { name, value } = target;
      setState({ ...state, [name]: { value, valid: !isNaN(+value) } });
    },
    { d, multiplier, svgProps } = evalParams(state),
    formProps = { ...state, d, multiplier, onChange };

  return (
    <>
      <Form {...formProps} />
      <Svg {...svgProps} />
    </>
  );
}

function evalParams(state) {
  const letterSize = 13;

  let a = +state.a.value,
    b = +state.b.value,
    c = +state.c.value,
    e = +state.e.value,
    angle = +state.angle.value,
    p1 = +state.padding1.value,
    p2 = +state.padding2.value,
    gap = +state.gap.value,
    diag = +state.diagonal.value,
    width0 = +state.width.value,
    height0 = +state.height.value,
    // evaluated params
    angle2 = ((180 - angle) / 180) * Math.PI,
    h = c / Math.tan(angle2),
    d = a + 2 * h,
    dh = diag / 2 / Math.sqrt(2),
    yellowWidth = 4 * a + 6 * h + 3 * b,
    width = yellowWidth + 2 * (p1 + p2),
    height = e + 2 * (p1 + p2),
    x0,
    y0,
    // multiplier
    pad = (p1 + p2) * 2,
    m1 = (width0 - pad) / (width - pad),
    m2 = (height0 - pad) / (height - pad),
    m = Math.min(m1, m2);

  // scale
  a *= m;
  b *= m;
  c *= m;
  d *= m;
  e *= m;
  h *= m;
  yellowWidth *= m;
  width = width0;
  height = height0;
  x0 = (width - yellowWidth) / 2;
  y0 = (height - e) / 2 + e;

  // yellow castle
  let x = x0,
    y = y0,
    castle = [
      [x, y],
      [x, (y += c - e)],
      [(x += a), y],
      [(x += h), (y -= c)],
      [(x += b), y],
      [(x += h), (y += c)],
      [(x += a), y],
      [(x += h), (y -= c)],
      [(x += b), y],
      [(x += h), (y += c)],
      [(x += a), y],
      [(x += h), (y -= c)],
      [(x += b), y],
      [(x += h), (y += c)],
      [(x += a), y],
      [x, y - c + e],
    ];

  let svg = {
    castle,
    width,
    height,
    greenLines: [],
    letters: [],
  };

  // Blue arc
  let diam = c + p2 - gap,
    arcx0 = x0 + yellowWidth - a + 1,
    arcy0 = y0 - e + c - 1,
    arcx1 = arcx0 + diam,
    arcy1 = arcy0,
    arcx2 = arcx0 - diam * Math.cos(angle2),
    arcy2 = arcy0 - diam * Math.sin(angle2),
    rotation = (angle / 180) * Math.PI,
    path =
      `M ${arcx1.toFixed(2)},${arcy1.toFixed(2)} ` +
      `A ${diam.toFixed(2)},${diam.toFixed(2)} ` +
      `${rotation.toFixed(2)} 0,0 ` +
      `${arcx2.toFixed(2)},${arcy2.toFixed(2)}`;

  svg.arc = {
    path,
    lines: [
      ["angle1", arcx0, arcy0, arcx1, arcy1],
      ["angle2", arcx0, arcy0, arcx2, arcy2],
    ],
    letter: {
      key: "angle-letter",
      x: arcx0 + diam / 1.4,
      y: arcy0 - diam / 1.4,
      text: `${angle}°`,
    },
  };

  // A
  let ax1 = x0,
    ax2 = ax1 + a + b + 2 * h,
    ax3 = ax2 + a,
    ax4 = ax3 + 2 * dh,
    ay1 = y0 - e + c + gap,
    ay2 = y0 + p2,
    ay3 = ay2 + 2 * dh;
  svg.greenLines.push(
    ...[
      ["a1", ax1, ay2, ax2, ay2],
      ["a2", ax3, ay2, ax4, ay2],
      ["a3", ax2, ay1, ax2, ay3],
      ["a4", ax3, ay1, ax3, ay3],
      ["a5", ax2 - dh, ay2 + dh, ax2 + dh, ay2 - dh],
      ["a6", ax3 - dh, ay2 + dh, ax3 + dh, ay2 - dh],
    ]
  );
  svg.letters.push({
    key: "A",
    x: ax1 - letterSize * 4,
    y: ay2 + letterSize / 2,
    text: `A(${(a / m).toFixed(0)}")`,
  });

  // B
  let bx1 = x0 + a + h - p2,
    bx2 = bx1 + p2,
    bx3 = bx2 + b,
    bx4 = bx3 + 2 * dh,
    by1 = y0 - e - p2 - 2 * dh,
    by2 = by1 + 2 * dh,
    by3 = by2 + p2 - gap;
  svg.greenLines.push(
    ...[
      ["b1", bx1, by2, bx2, by2],
      ["b2", bx3, by2, bx4, by2],
      ["b3", bx2, by1, bx2, by3],
      ["b4", bx3, by1, bx3, by3],
      ["b5", bx2 - dh, by2 + dh, bx2 + dh, by2 - dh],
      ["b6", bx3 - dh, by2 + dh, bx3 + dh, by2 - dh],
    ]
  );
  svg.letters.push({
    key: "B",
    x: bx1 - letterSize * 4,
    y: by2 + letterSize / 2,
    text: `B(${(b / m).toFixed(0)}")`,
  });

  // C
  let cx1 = x0 + yellowWidth - a - h + gap,
    cx2 = x0 + yellowWidth + gap,
    cx3 = x0 + yellowWidth + p2 * 0.7,
    cx4 = cx3 + 2 * dh,
    cy2 = y0 - e,
    cy1 = cy2 - 2 * dh,
    cy3 = cy2 + c,
    cy4 = cy3 + 2 * dh;
  svg.greenLines.push(
    ...[
      ["c1", cx1, cy2, cx4, cy2],
      ["c2", cx3, cy1, cx3, cy4],
      ["c3", cx2, cy3, cx4, cy3],
      ["c4", cx3 - dh, cy2 - dh, cx3 + dh, cy2 + dh],
      ["c5", cx3 - dh, cy3 - dh, cx3 + dh, cy3 + dh],
    ]
  );
  svg.letters.push({
    key: "c-letter",
    x: cx3 - letterSize / 2,
    y: cy4 + letterSize,
    text: `C(${(c / m).toFixed(0)}")`,
  });

  // D
  let dx1 = x0 + 2 * (a + b) + 3 * h - 2 * dh,
    dx2 = dx1 + 2 * dh,
    dx3 = dx2 + d,
    dx4 = x0 + yellowWidth,
    dy1 = by1,
    dy2 = by2,
    dy3 = by3;
  svg.greenLines.push(
    ...[
      ["d1", dx1, dy2, dx2, dy2],
      ["d2", dx3, dy2, dx4, dy2],
      ["d3", dx2, dy1, dx2, dy3],
      ["d4", dx3, dy1, dx3, dy3],
      ["d5", dx2 - dh, dy2 + dh, dx2 + dh, dy2 - dh],
      ["d6", dx3 - dh, dy2 + dh, dx3 + dh, dy2 - dh],
    ]
  );
  svg.letters.push({
    key: "d-letter",
    x: dx4 + letterSize / 2,
    y: dy2 + letterSize / 2 - 1,
    text: `D(${(d / m).toFixed(2)}")`,
  });

  // E
  let ex1 = x0 - p2 - 2 * dh,
    ex2 = ex1 + 2 * dh,
    ex3 = x0 - gap,
    ex4 = ex3 + a + h,
    ey1 = y0 - e - 2 * dh,
    ey2 = ey1 + 2 * dh,
    ey3 = ey2 + e / 2 - letterSize,
    ey4 = ey3 + letterSize * 2,
    ey5 = y0,
    ey6 = ey5 + 2 * dh;
  svg.greenLines.push(
    ...[
      ["e1", ex1, ey2, ex4, ey2],
      ["e2", ex1, ey5, ex3, ey5],
      ["e3", ex2, ey1, ex2, ey3],
      ["e4", ex2, ey4, ex2, ey6],
      ["e5", ex2 - dh, ey2 - dh, ex2 + dh, ey2 + dh],
      ["e6", ex2 - dh, ey5 - dh, ex2 + dh, ey5 + dh],
    ]
  );
  svg.letters.push({
    key: "e-letter",
    x: ex2 - letterSize * 2,
    y: ey3 + letterSize * 1.5 - 2,
    text: `E(${(e / m).toFixed(0)}")`,
  });
  return { d, multiplier: m, svgProps: svg };
}
