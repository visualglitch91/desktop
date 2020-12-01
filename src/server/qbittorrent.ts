import api from "qbittorrent-api-v2";
import { Express } from "express";

let client: any;

api.connect("http://localhost:9999", "", "").then((_client: any) => {
  client = _client;
});

function qbittorrent(app: Express) {
  app.get("/qbittorrent/torrents", (_, res) => {
    client.torrents().then((torrents: Torrent[]) => {
      res.send(torrents);
    });
  });
}

export default qbittorrent;
