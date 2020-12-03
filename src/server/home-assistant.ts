import { Express } from "express";
import proxy from "./proxy";

const { HOME_ASSISTANT: TOKEN } = require("./secrets.json");

function homeAssistant(app: Express) {
  app.use(
    "/home-assistant",
    proxy({
      target: "http://127.0.0.1:8123/api",
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
  );
}

export default homeAssistant;
