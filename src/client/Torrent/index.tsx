import { h } from "preact";
import usePooling from "../utils/usePooling";
import FadeIn from "../base/FadeIn";
import ProgressBar from "../base/ProgressBar";
import Text from "../base/Text";
import ListItem from "../base/ListItem";
import Spacer from "../base/Spacer";

function Torrent() {
  const [torrents] = usePooling<Torrent[]>("/qbittorrent/torrents", 15 * 1000);

  if (!torrents || !torrents.length) {
    return <FadeIn key="root" visible={false} />;
  }

  return (
    <FadeIn key="root" visible>
      <Text>Torrents</Text>
      <Spacer />
      <div>
        {torrents.map((torrent) => {
          const percent = (torrent.downloaded * 100) / torrent.size;

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
