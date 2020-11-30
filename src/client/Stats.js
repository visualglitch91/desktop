import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
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
  const [stats, setStats] = useState();

  function refreshStats() {
    fetch("/system-stats")
      .then((res) => res.json())
      .then(setStats);
  }

  useEffect(() => {
    refreshStats();

    const interval = setInterval(refreshStats, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
