import { h } from "preact";
import usePooling from "../utils/usePooling";
import { take } from "../utils/array";
import FadeIn from "../base/FadeIn";
import ListItem from "../base/ListItem";
import Text from "../base/Text";
import Panel from "../base/Panel";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

function UpcomingShows() {
  const [allEpisodes] = usePooling<Episode[]>(
    "/trakt/upcoming-shows",
    24 * 60 * 60 * 1000
  );

  if (!allEpisodes || !allEpisodes.length) {
    return <FadeIn key="root" visible={false} />;
  }

  return (
    <FadeIn key="root" visible>
      <Panel>
        {take(allEpisodes, 7).map((episode, index) => (
          <ListItem key={index} column extraMargin>
            <Text>
              {formatDate(episode.date)} - {episode.show}
            </Text>
            <Text size="sm">
              {episode.season}x{episode.number} - {episode.title}
            </Text>
          </ListItem>
        ))}
      </Panel>
    </FadeIn>
  );
}

export default UpcomingShows;
