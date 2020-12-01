import fetch, { Response, RequestInit } from "node-fetch";
import { Express } from "express";

const API = "https://habitica.com";
const { HABITICA: credentials } = require("./secrets.json");

const toJSON = (res: Response) => res.json();

function authFetch(path: string, options?: RequestInit) {
  return fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-api-user": credentials.user_id,
      "x-api-key": credentials.token,
    },
  });
}

function habitica(app: Express) {
  app.get("/habitica/stats", (_, res) => {
    authFetch(`${API}/api/v3/user`)
      .then(toJSON)
      .then((json) => res.send(json.data.stats));
  });

  app.get("/habitica/tasks", (_, res) => {
    Promise.all([
      authFetch(`${API}/api/v3/tasks/user`).then(toJSON),
      authFetch(`${API}/api/v3/tasks/user?type=completedTodos`).then(toJSON),
    ]).then(([all, completedTodos]) => {
      res.send([...all.data, ...completedTodos.data]);
    });
  });

  app.post("/habitica/tasks/:taskId/score/:direction", (req, res) => {
    const { taskId, direction } = req.params;

    authFetch(`${API}/api/v3/tasks/${taskId}/score/${direction}`, {
      method: "POST",
    })
      .then(toJSON)
      .then((json) => res.send(json));
  });
}

export default habitica;
