import path from "path";
import express from "express";

import homeAssistant from "./home-assistant";
import systemStats from "./system-stats";
import habitica from "./habitica";
import chromeLauncher from "./chrome-launcher";
import lazySeal12 from "./lazy-seal-12";
import trakt from "./trakt";
import qbittorrent from "./qbittorrent";
import ifttt from "./ifttt";
import zenity from "./zenity";

const PORT = process.env.PORT || 4123;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

homeAssistant(app);
systemStats(app);
habitica(app);
chromeLauncher(app);
lazySeal12(app);
trakt(app);
qbittorrent(app);
ifttt(app);
zenity(app);

app.listen(PORT, () => console.log("listening on port", PORT));
