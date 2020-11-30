import { h } from "preact";
import usePooling from "./usePooling";
import ProgressBar from "./ProgressBar";
import "./Stats.css";

function Stat({ label, value }) {
  return (
    <li>
      <ProgressBar label={`${label} ${Math.floor(value)}%`} value={value} />
    </li>
  );
}

function Stats() {
  const [stats] = usePooling("/system-stats", 5 * 1000);

  if (!stats) {
    return;
  }

  return (
    <ul className="Stats">
      <Stat label="memoria" value={stats.memory} />
      <Stat label="cpu" value={stats.cpu} />
      {Object.keys(stats.disks).map((disk) => (
        <Stat key={disk} label={`disco ${disk}`} value={stats.disks[disk]} />
      ))}
    </ul>
  );
}

export default Stats;
