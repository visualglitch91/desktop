import { Express } from "express";
import proxy from "./proxy";

const {
  HOME_ASSISTANT: { server, token },
} = require("./secrets.json"); //eslint-disable-line @typescript-eslint/no-var-requires

function homeAssistant(app: Express) {
  app.use(
    "/home-assistant",
    proxy({
      target: `${server}/api`,
      headers: { Authorization: `Bearer ${token}` },
    })
  );
}

export default homeAssistant;
