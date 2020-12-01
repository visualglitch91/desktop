import { h } from "preact";
import usePooling from "../utils/usePooling";
import ProgressBar from "../base/ProgressBar";
import ListItem from "../base/ListItem";

function Stat({ label, value }) {
  return (
    <ListItem extraMargin>
      <ProgressBar
        accentColor
        label={`${label} ${Math.floor(value)}%`}
        labelSize="md"
        value={value}
      />
    </ListItem>
  );
}

function Stats() {
  const [stats] = usePooling("/system-stats", 5 * 1000);

  if (!stats) {
    return;
  }

  return (
    <div>
      <Stat label="memoria" value={stats.memory} />
      <Stat label="cpu" value={stats.cpu} />
      {Object.keys(stats.disks).map((disk) => (
        <Stat key={disk} label={`disco ${disk}`} value={stats.disks[disk]} />
      ))}
    </div>
  );
}

export default Stats;
