import { Express } from "express";
import proxy from "./proxy";

//eslint-disable-next-line @typescript-eslint/no-var-requires
const { LAZY_SEAL_12_SECRET_TOKEN: token } = require("./secrets.json");
const API = "https://lazy-seal-12.herokuapp.com";

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
