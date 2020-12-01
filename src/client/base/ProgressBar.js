import { h } from "preact";
import cx from "classnames";
import Text from "./Text";
import "./ProgressBar.css";

function ProgressBar({ accentColor, label, labelSize = "sm", value }) {
  return (
    <div className="progress-bar">
      <Text size={labelSize} monospace>
        {label}
      </Text>
      <div className="progress-bar__bar">
        <div
          style={{ width: `${value}%` }}
          className={cx(
            "progress-bar__inner",
            accentColor && "progress-bar__inner--accent-color"
          )}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
