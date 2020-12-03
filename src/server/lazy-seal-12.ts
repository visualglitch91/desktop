import { Express } from "express";
import proxy from "./proxy";

const API = "https://lazy-seal-12.herokuapp.com";
const { LAZY_SEAL_12_SECRET_TOKEN: token } = require("./secrets.json");

function lazySeal12(app: Express) {
  app.use(
    "/lazy-seal-12",
    proxy({
      target: API,
      bodyParser: (body) => ({ token, ...body }),
    })
  );
}

export default lazySeal12;
