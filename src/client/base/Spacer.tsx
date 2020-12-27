import { h, ComponentProps } from "preact";
import cx from "classnames";
import Element from "./Element";
import "./Spacer.css";

function Spacer({ className, ...props }: ComponentProps<typeof Element>) {
  return <Element {...props} className={cx(className, "spacer")} />;
}

export default Spacer;
