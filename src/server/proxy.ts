import fetch from "node-fetch";
import { Request, Response } from "express";

type Headers = {
  [key: string]: string;
};

function join(base: string, relative: string) {
  return relative
    ? base.replace(/\/+$/, "") + "/" + relative.replace(/^\/+/, "")
    : base;
}

function proxy({
  target,
  headers = {},
  bodyParser = (f) => f,
}: {
  target: string;
  headers?: Headers;
  bodyParser?: (a: any) => any;
}) {
  return (req: Request, res: Response) => {
    console.log("url", join(target, req.path));
    console.log("body", JSON.stringify(bodyParser(req.body)));

    fetch(join(target, req.path), {
      method: req.method,
      headers: { ...headers, "Content-Type": "application/json" },
      body: ["GET", "HEAD"].includes(req.method)
        ? undefined
        : JSON.stringify(bodyParser(req.body)),
    }).then(
      (it) => it.body.pipe(res),
      (err) => {
        console.error(err);
        res.sendStatus(500);
      }
    );
  };
}

export default proxy;
