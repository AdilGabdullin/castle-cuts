import React from "react";

export default function Form(props) {
  const inputs = [
    "a",
    "b",
    "c",
    "e",
    "angle",
    "padding1",
    "padding2",
    "gap",
    "diagonal",
    "width",
    "height",
  ].map((name) => (
    <Input
      name={name}
      value={props[name].value}
      valid={props[name].valid}
      onChange={props.onChange}
    />
  ));

  return (
    <form className="mb-3">
      <div className="row">
        {inputs[0]}
        {inputs[1]}
        {inputs[2]}
        <Disabled name="d" value={props.d.toFixed(2)} />
        {inputs[3]}
        {inputs[4]}
      </div>
      <div className="row">
        {inputs[5]}
        {inputs[6]}
        {inputs[7]}
        {inputs[8]}
        {inputs[9]}
        {inputs[10]}
      </div>
      <div className="row col-sm-2">
        <Disabled name="multiplier" value={props.multiplier.toFixed(4)} />
      </div>
    </form>
  );
}

function Input({ name, value, valid, onChange }) {
  const id = name + "-input";
  return (
    <div className="col" key={name}>
      <label htmlFor={id}>{ucFirst(name)}</label>
      <input
        type="text"
        id={id}
        className={"form-control" + (!valid ? " is-invalid" : "")}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function Disabled({ name, value }) {
  const id = name + "-input";
  return (
    <div className="col" key={name}>
      <label htmlFor={id}>{ucFirst(name)}</label>
      <input
        type="text"
        id={id}
        className="form-control"
        name={name}
        value={value}
        disabled
      />
    </div>
  );
}

function ucFirst(str) {
  return str[0].toUpperCase() + str.slice(1);
}
