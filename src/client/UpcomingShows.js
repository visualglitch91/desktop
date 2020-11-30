import { h } from "preact";
import usePooling from "./usePooling";
import "./UpcomingShows.css";

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
    <ul className="UpcomingShows">
      {episodes.map((episode, index) => (
        <li key={index}>
          <div className="UpcomingShows__Line1">
            {formatDate(episode.date)} - {episode.show}
          </div>
          <div className="UpcomingShows__Line2">
            {episode.season}x{episode.number} - {episode.title}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UpcomingShows;
