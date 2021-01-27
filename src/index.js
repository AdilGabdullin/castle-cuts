import React from "react";
import ReactDom from "react-dom";
import App from "./App";

const values = {
  a: "10",
  b: "20",
  c: "40",
  e: "110",
  angle: "100",
  padding1: "60",
  padding2: "40",
  gap: "10",
  diagonal: "20",
  width: "342.7",
  height: "310",
};

ReactDom.render(<App values={values} />, document.getElementById("root"));
