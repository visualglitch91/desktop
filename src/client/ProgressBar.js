import { h } from "preact";
import "./ProgressBar.css";

function ProgressBar({ label, value, dark }) {
  return (
    <div className="ProgressBar">
      <div className="ProgressBar__Label">{label}</div>
      <div className="ProgressBar__Bar">
        <div
          className={`ProgressBar__Inner ${
            dark ? "ProgressBar__Inner-Dark" : ""
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
