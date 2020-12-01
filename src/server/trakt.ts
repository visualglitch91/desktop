import fs from "fs";
import path from "path";
import Trakt from "trakt.tv";
import { Express } from "express";
import rootdir from "./rootdir";

const traktClient: any = new Trakt(require("./secrets.json").TRAKT);
const tokenFile = path.join(rootdir, "trakt_token.json");

function refreshTokens() {
  const storedTokens = JSON.parse(fs.readFileSync(tokenFile, "utf-8"));

  traktClient.import_token(storedTokens).then((newTokens: any) => {
    fs.writeFileSync(tokenFile, JSON.stringify(newTokens));
  });
}

function getUpcomingShows(): Promise<Episode[]> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);

  return traktClient.calendars.my
    .shows({
      start_date: startDate.toISOString().slice(0, 10),
      days: "14",
      extended: "full",
    })
    .then((episodes: any) =>
      episodes.map(({ first_aired, episode, show }: any) => ({
        date: first_aired,
        show: show.title,
        season: episode.season,
        number: episode.number,
        title: episode.title,
      }))
    );
}

function trakt(app: Express) {
  refreshTokens();
  setInterval(refreshTokens, 24 * 60 * 60 * 1000);

  app.get("/trakt/upcoming-shows", (_, res) => {
    getUpcomingShows().then((episodes) => res.send(episodes));
  });
}

export default trakt;
