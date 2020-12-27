import { h } from "preact";
import usePooling from "../utils/usePooling";
import { post } from "../utils/api";
import FadeIn from "../base/FadeIn";
import ProgressBar from "../base/ProgressBar";
import ListItem from "../base/ListItem";
import Text from "../base/Text";
import Toggle from "../base/Toggle";

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
  const [stats, , setStats] = usePooling<SystemStats>(
    "/system-stats",
    5 * 1000
  );

  if (!stats) {
    return <FadeIn key="root" visible={false} />;
  }

  function toggleVPN() {
    post("/system-stats/vpn/toggle");
    setStats((stats) => stats && { ...stats, vpn: !stats.vpn });
  }

  return (
    <FadeIn key="root" visible>
      <Stat label="memoria" value={stats.memory} />
      <Stat label="cpu" value={stats.cpu} />
      {Object.keys(stats.disks).map((disk) => (
        <Stat key={disk} label={`disco ${disk}`} value={stats.disks[disk]} />
      ))}
      <ListItem hoverable onClick={toggleVPN} style={{ marginLeft: -2 }}>
        <Text>
          <Toggle marginRight size="lg" checked={stats.vpn} />
          {stats.vpn ? "VPN Connected" : "VPN Disconnected"}
        </Text>
      </ListItem>
    </FadeIn>
  );
}

export default Stats;
