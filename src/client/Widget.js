import { h } from "preact";

const styleProps = ["top", "left", "bottom", "right", "width", "height"];

function Widget({ children, ...props }) {
  const style = { position: "absolute" };

  styleProps.forEach((name) => {
    if (props[name] !== undefined) {
      style[name] = props[name];
    }
  });

  return <div style={style}>{children}</div>;
}

export default Widget;
