import fs from "fs";
import path from "path";
import Trakt from "trakt.tv";
import { Express } from "express";
import rootdir from "./rootdir";

//eslint-disable-next-line @typescript-eslint/no-var-requires
const traktClient: any = new Trakt(require("./secrets.json").TRAKT);
const tokenFile = path.join(rootdir, "trakt_token.json");

let upcomingPromise: Promise<any>;

function refreshTokens() {
  const storedTokens = JSON.parse(fs.readFileSync(tokenFile, "utf-8"));

  traktClient.import_token(storedTokens).then((newTokens: any) => {
    fs.writeFileSync(tokenFile, JSON.stringify(newTokens));
  });
}

function refreshUpcoming() {
  const past = 14;
  const future = 7;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - past);

  upcomingPromise = Promise.all([
    traktClient.sync.watched({ type: "shows" }),
    traktClient.calendars.my.shows({
      start_date: startDate.toISOString().slice(0, 10),
      days: String(past + future),
      extended: "full",
    }),
  ]).then(([watched, episodes]: any) => {
    const watchedMap: { [key: string]: boolean } = {};

    watched.forEach((item: any) => {
      item.seasons.forEach((season: any) => {
        season.episodes.forEach((episode: any) => {
          const key = `${item.show.ids.trakt}_${season.number}_${episode.number}`;
          watchedMap[key] = true;
        });
      });
    });

    return episodes
      .filter((item: any) => {
        const key = `${item.show.ids.trakt}_${item.episode.season}_${item.episode.number}`;
        return !watchedMap[key];
      })
      .map(({ first_aired, episode, show }: any) => ({
        date: first_aired,
        show: show.title,
        season: episode.season,
        number: episode.number,
        title: episode.title,
      }));
  });
}

function trakt(app: Express) {
  refreshTokens();
  setInterval(refreshTokens, 24 * 60 * 60 * 1000);

  refreshUpcoming();
  setInterval(refreshUpcoming, 12 * 60 * 60 * 1000);

  app.get("/trakt/upcoming-shows", (_, res) => {
    upcomingPromise.then((upcoming) => res.send(upcoming));
  });
}

export default trakt;
