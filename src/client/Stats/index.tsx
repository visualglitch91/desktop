import { h } from "preact";
import usePooling from "../utils/usePooling";
import FadeIn from "../base/FadeIn";
import ProgressBar from "../base/ProgressBar";
import ListItem from "../base/ListItem";

function Stat({ label, value }: { label: string; value: number }) {
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
  const [stats] = usePooling<SystemStats>("/system-stats", 5 * 1000);

  if (!stats) {
    return <FadeIn key="root" visible={false} />;
  }

  return (
    <FadeIn key="root" visible>
      <Stat label="memoria" value={stats.memory} />
      <Stat label="cpu" value={stats.cpu} />
      {Object.keys(stats.disks).map((disk) => (
        <Stat key={disk} label={`disco ${disk}`} value={stats.disks[disk]} />
      ))}
    </FadeIn>
  );
}

export default Stats;
