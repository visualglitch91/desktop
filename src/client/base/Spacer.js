import { h } from "preact";
import cx from "classnames";
import "./Spacer.css";

function Spacer({ className, ...props }) {
  return <div {...props} className={cx(className, "spacer")} />;
}

export default Spacer;
