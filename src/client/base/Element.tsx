import { h, AnyComponent } from "preact";
import cx from "classnames";
import "./Element.css";

function Element({
  hoverable,
  column,
  className,
  component: Component = "div",
  ...props
}: {
  hoverable?: boolean;
  column?: boolean;
  className?: string;
  component?: any;
} & Omit<h.JSX.HTMLAttributes, "size">) {
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
