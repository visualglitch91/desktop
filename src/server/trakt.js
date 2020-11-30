import fs from "fs";
import path from "path";
import Trakt from "trakt.tv";
import rootdir from "./rootdir";

const traktClient = new Trakt(require("./secrets.json").TRAKT);
const tokenFile = path.join(rootdir, "trakt_token.json");

function refreshTokens() {
  const storedTokens = JSON.parse(fs.readFileSync(tokenFile, "UTF-8"));

  traktClient.import_token(storedTokens).then((newTokens) => {
    fs.writeFileSync(tokenFile, JSON.stringify(newTokens));
  });
}

function getUpcomingShows() {
  return traktClient.calendars.my
    .shows({
      start_date: new Date().toISOString().slice(0, 10),
      days: "7",
      extended: "full",
    })
    .then((episodes) =>
      episodes.map(({ first_aired, episode, show }) => ({
        date: first_aired,
        show: show.title,
        season: episode.season,
        number: episode.number,
        title: episode.title,
      }))
    );
}

function trakt(app) {
  refreshTokens();
  setInterval(refreshTokens, 24 * 60 * 60 * 1000);

  app.get("/trakt/upcoming-shows", (_, res) => {
    getUpcomingShows().then((episodes) => res.send(episodes));
  });
}

export default trakt;
