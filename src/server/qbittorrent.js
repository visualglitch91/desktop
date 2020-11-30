import api from "qbittorrent-api-v2";

let client;

api.connect("http://localhost:9999").then((_client) => {
  client = _client;
});

function qbittorrent(app) {
  app.get("/qbittorrent/torrents", (_, res) => {
    client.torrents().then((torrents) => {
      res.send(torrents);
    });
  });
}

export default qbittorrent;
