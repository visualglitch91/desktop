import api from "qbittorrent-api-v2";
import { Express } from "express";

let _client: any;

async function wrapper(method: string, ...args: any[]) {
  if (!_client) {
    _client = await api.connect("http://localhost:9999", "", "");
  }

  return _client[method](...args).catch((error: any) => {
    _client = undefined;
    return Promise.reject(error);
  });
}

function qbittorrent(app: Express) {
  app.get("/qbittorrent/state", async (_, res) => {
    let running = true;

    wrapper("torrents")
      .catch(() => {
        running = false;
        return [];
      })
      .then((torrents: Torrent[]) => {
        res.send({ running, torrents });
      });
  });
}

export default qbittorrent;
