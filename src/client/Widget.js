import { h } from "preact";
import "./Widget.css";

const styleProps = ["top", "left", "bottom", "right", "width", "height"];

function Widget({ children, style, ...props }) {
  const _style = { ...style, position: "absolute" };

  styleProps.forEach((name) => {
    if (props[name] !== undefined) {
      _style[name] = props[name];
    }
  });

  return (
    <div style={_style} className="Widget">
      {children}
    </div>
  );
}

export default Widget;
