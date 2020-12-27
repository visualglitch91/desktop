import fetch from "node-fetch";
import { Express } from "express";

const { IFTTT_WEBHOOK } = require("./secrets.json"); //eslint-disable-line @typescript-eslint/no-var-requires

function ifttt(app: Express) {
  app.post("/ifttt/:event", (req, res) => {
    fetch(IFTTT_WEBHOOK.replace("{{EVENT}}", req.params.event), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    }).then((respose) => {
      res.sendStatus(respose.status);
    });
  });
}

export default ifttt;
