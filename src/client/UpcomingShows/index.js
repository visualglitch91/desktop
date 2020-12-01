import { h } from "preact";
import usePooling from "../utils/usePooling";
import ListItem from "../base/ListItem";
import Text from "../base/Text";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

function UpcomingShows() {
  const [episodes] = usePooling("/trakt/upcoming-shows", 24 * 60 * 60 * 1000);

  if (!episodes) {
    return null;
  }

  return (
    <div>
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
    </div>
  );
}

export default UpcomingShows;
