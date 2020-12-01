import { h } from "preact";
import cx from "classnames";
import Element from "./Element";
import "./Text.css";

function Text({ className, size = "md", monospace, ellipsis, ...props }) {
  return (
    <Element
      {...props}
      className={cx(
        className,
        "text",
        `text--size-${size}`,
        ellipsis && "text--ellipsis",
        monospace && "text--monospace"
      )}
    />
  );
}

export default Text;
