import { h } from "preact";
import usePooling from "../utils/usePooling";
import FadeIn from "../base/FadeIn";
import ListItem from "../base/ListItem";
import Text from "../base/Text";

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
  const [episodes] = usePooling<Episode[]>(
    "/trakt/upcoming-shows",
    24 * 60 * 60 * 1000
  );

  if (!episodes || !episodes.length) {
    return <FadeIn key="root" visible={false} />;
  }

  return (
    <FadeIn key="root" visible>
      {episodes.map((episode, index) => (
        <ListItem key={index} column extraMargin>
          <Text>
            {formatDate(episode.date)} - {episode.show}
          </Text>
          <Text size="sm">
            {episode.season}x{episode.number} - {episode.title}
          </Text>
        </ListItem>
      ))}
    </FadeIn>
  );
}

export default UpcomingShows;
