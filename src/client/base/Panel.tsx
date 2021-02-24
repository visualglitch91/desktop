import { h } from "preact";
import cx from "classnames";
import "./Panel.css";

function Panel({ className, ...props }: Omit<h.JSX.HTMLAttributes, "ref">) {
  return <div {...props} className={cx(className, "panel")} />;
}

export default Panel;
