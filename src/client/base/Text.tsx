import { h, ComponentProps } from "preact";
import cx from "classnames";
import Element from "./Element";
import "./Text.css";

function Text({
  className,
  size = "md",
  monospace,
  ellipsis,
  ...props
}: {
  size?: "sm" | "md" | "lg";
  monospace?: boolean;
  ellipsis?: boolean;
} & ComponentProps<typeof Element>) {
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
