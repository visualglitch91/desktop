import fetch from "node-fetch";

const API = "https://habitica.com";
const { HABITICA: credentials } = require("./secrets.json");

function authFetch(path, options) {
  return fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-api-user": credentials.user_id,
      "x-api-key": credentials.token,
    },
  });
}

function habitica(app) {
  app.get("/habitica/stats", (_, res) => {
    authFetch(`${API}/api/v3/user`)
      .then((res) => res.json())
      .then((json) => res.send(json));
  });

  app.get("/habitica/tasks", (_, res) => {
    authFetch(`${API}/api/v3/tasks/user`)
      .then((res) => res.json())
      .then((json) => res.send(json));
  });

  app.post("/habitica/tasks/:taskId/score/:direction", (req, res) => {
    const { taskId, direction } = req.params;

    authFetch(`${API}/api/v3/tasks/${taskId}/score/${direction}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((json) => res.send(json));
  });
}

export default habitica;
