import { h, ComponentProps } from "preact";
import cx from "classnames";
import Element from "./Element";
import "./Icon.css";

function Icon({
  name,
  className,
  marginLeft,
  marginRight,
  size = "md",
  ...props
}: {
  marginLeft?: boolean;
  marginRight?: boolean;
  size?: "sm" | "md" | "lg";
} & ComponentProps<typeof Element>) {
  return (
    <Element
      component="span"
      className={cx(
        "icon",
        marginLeft && "icon--margin-left",
        marginRight && "icon--margin-right",
        `icon--size-${size}`,
        "mdi",
        `mdi-${name}`,
        className
      )}
      {...props}
    />
  );
}

export default Icon;
