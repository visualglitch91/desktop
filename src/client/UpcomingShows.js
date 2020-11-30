import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
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
  const [episodes, setEpisodes] = useState();

  function refreshEpisodes() {
    fetch("/trakt/upcoming-shows")
      .then((res) => res.json())
      .then(setEpisodes);
  }

  useEffect(() => {
    refreshEpisodes();

    const interval = setInterval(refreshEpisodes, 24 * 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
