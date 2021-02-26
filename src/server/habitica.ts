import { Express } from "express";
import fetch, { RequestInit } from "node-fetch";
import proxy from "./proxy";

//eslint-disable-next-line @typescript-eslint/no-var-requires
const { HABITICA: credentials } = require("./secrets.json");
const API = "https://habitica.com/api/v3";

const headers = {
  "x-api-user": credentials.user_id,
  "x-api-key": credentials.token,
};

function authFetch(path: string, options?: RequestInit) {
  return fetch(path, {
    ...options,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function habitica(app: Express) {
  app.get("/habitica/tasks", (_, res) => {
    Promise.all([
      authFetch(`${API}/tasks/user`),
      authFetch(`${API}/tasks/user?type=completedTodos`),
    ]).then(([all, completedTodos]) => {
      res.send([...all.data, ...completedTodos.data]);
    });
  });

  app.use("/habitica", proxy({ target: API, headers }));
}

export default habitica;
