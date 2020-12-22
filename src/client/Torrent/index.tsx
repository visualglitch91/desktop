import { Fragment, h } from "preact";
import usePooling from "../utils/usePooling";
import FadeIn from "../base/FadeIn";
import ProgressBar from "../base/ProgressBar";
import Text from "../base/Text";
import ListItem from "../base/ListItem";
import Spacer from "../base/Spacer";
import Button from "../base/Button";

function Torrent() {
  const [state] = usePooling<TorrentState>("/qbittorrent/state", 1 * 1000);

  if (!state) {
    return <FadeIn key="root" visible={false} />;
  }

  function launch() {
    fetch("/chrome-launcher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "D:\\Apps\\qBittorrent\\qbittorrent.exe" }),
    });
  }

  let message = !state.running ? (
    <Fragment>
      <Text style={{ justifyContent: "flex-end" }}>
        Torrent client is
        <br />
        not running
      </Text>
      <Button
        onClick={launch}
        style={{ width: 60, marginLeft: "auto", marginTop: 8 }}
      >
        <Text size="sm">Open</Text>
      </Button>
    </Fragment>
  ) : state.torrents.length === 0 ? (
    <Text style={{ justifyContent: "flex-end" }}>
      Your torrent list
      <br />
      is empty
    </Text>
  ) : null;

  if (message) {
    return (
      <FadeIn key="root" visible>
        <div style={{ textAlign: "right" }}>{message}</div>
      </FadeIn>
    );
  }

  return (
    <FadeIn key="root" visible>
      <Text>Torrents</Text>
      <Spacer />
      <div>
        {state.torrents.map((torrent) => {
          const percent = (torrent.completed * 100) / torrent.size;

          return (
            <ListItem column extraMargin>
              <Text ellipsis>{torrent.name}</Text>
              <ProgressBar label={`${Math.floor(percent)}%`} value={percent} />
            </ListItem>
          );
        })}
      </div>
    </FadeIn>
  );
}

export default Torrent;
