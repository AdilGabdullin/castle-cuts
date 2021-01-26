function Form(props) {
  function Input(label) {
    const { onChange } = props,
      name = label.toLowerCase(),
      { value, valid, disabled } = props[name],
      id = name + "-input",
      className = "form-control" + (!valid ? " is-invalid" : "");
    return h(
      "div",
      { key: name, className: "col" },
      h("label", { htmlFor: id }, label),
      h("input", { id, className, name, value, disabled, onChange })
    );
  }

  function Disabled(label, precision) {
    const name = label.toLowerCase(),
      value = props[name].toFixed(precision),
      id = name + "-input",
      className = "form-control";
    return h(
      "div",
      { key: name, className: "col" },
      h("label", { htmlFor: id }, label),
      h("input", { id, className, name, value, disabled: true })
    );
  }

  return h(
    "form",
    null,
    h(
      "div",
      { className: "row" },
      Input("A"),
      Input("B"),
      Input("C"),
      Disabled("D", 2),
      Input("E"),
      Input("Angle")
    ),
    h(
      "div",
      { className: "row" },
      Input("Padding1"),
      Input("Padding2"),
      Input("Gap"),
      Input("Diagonal"),
      Input("Width"),
      Input("Height")
    ),
    h("div", { className: "row col-sm-2" }, Disabled("Multiplier", 4))
  );
}
