import path from "path";
import { spawn } from "child_process";
import { Express } from "express";
import rootdir from "./rootdir";

function zenity(app: Express) {
  app.post("/zenity", (req, res) => {
    const args = req.body;
    const child = spawn(path.join(rootdir, "zenity.exe"), args, {
      detached: true,
    });

    child.stdout.on("data", (data) => {
      res.send({ result: String(data) });
    });

    child.stderr.on("data", (error) => {
      console.error(error);
    });
  });
}

export default zenity;
