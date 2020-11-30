import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import ProgressBar from "./ProgressBar";
import "./Torrent.css";

function Torrent() {
  const [torrents, setTorrents] = useState();

  function refreshTorrents() {
    fetch("/qbittorrent/torrents")
      .then((res) => res.json())
      .then(setTorrents);
  }

  useEffect(() => {
    refreshTorrents();

    const interval = setInterval(refreshTorrents, 15000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!torrents) {
    return;
  }

  return (
    <div className="Torrent">
      <div className="Torrent__Label">Torrents</div>
      <ul>
        {torrents.map((torrent) => {
          const percent = (torrent.downloaded * 100) / torrent.size;

          return (
            <li>
              <div className="Torrent__Name">{torrent.name}</div>
              <ProgressBar
                dark
                label={`${Math.floor(percent)}%`}
                value={percent}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Torrent;
