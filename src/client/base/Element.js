import { h } from "preact";
import cx from "classnames";
import "./Element.css";

function Element({
  hoverable,
  column,
  className,
  component: Component = "div",
  ...props
}) {
  return (
    <Component
      {...props}
      className={cx(
        className,
        "element",
        hoverable && "element--hoverable",
        column && "element--column"
      )}
    />
  );
}

export default Element;
