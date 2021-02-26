import { h, ComponentProps } from "preact";
import cx from "classnames";
import Element from "./Element";
import "./Button.css";

function Button({ className, ...props }: ComponentProps<typeof Element>) {
  return <Element {...props} hoverable className={cx(className, "button")} />;
}

export default Button;
