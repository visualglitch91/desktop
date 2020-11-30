import { h } from "preact";
import usePooling from "./usePooling";
import ProgressBar from "./ProgressBar";
import "./Torrent.css";

function Torrent() {
  const [torrents] = usePooling("/qbittorrent/torrents", 15 * 1000);

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
