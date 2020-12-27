import { h } from "preact";
import "./Widget.css";

const styleProps: ["top", "left", "bottom", "right", "width", "height"] = [
  "top",
  "left",
  "bottom",
  "right",
  "width",
  "height",
];

function Widget({
  children,
  style,
  ...props
}: Omit<h.JSX.HTMLAttributes<HTMLDivElement>, "style"> & {
  top?: string | number;
  left?: string | number;
  bottom?: string | number;
  right?: string | number;
  width?: string | number;
  height?: string | number;
  style?: h.JSX.CSSProperties;
}) {
  const _style: h.JSX.CSSProperties = { ...style, position: "absolute" };

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
