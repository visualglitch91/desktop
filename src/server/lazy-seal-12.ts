import fetch from "node-fetch";
import { Express } from "express";

const API = "https://lazy-seal-12.herokuapp.com";
const { LAZY_SEAL_12_SECRET_TOKEN: token } = require("./secrets.json");

function lazySeal12(app: Express) {
  app.post("/lazy-seal-12", (req, res) => {
    const { path, ...data } = req.body;

    fetch(`${API}/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, ...data }),
    }).then((respose) => {
      res.sendStatus(respose.status);
    });
  });
}

export default lazySeal12;
