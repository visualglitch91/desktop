import path from "path";
import { spawn } from "child_process";
import { Express } from "express";
import rootdir from "./rootdir";
import platform from "./platform";

function zenity(app: Express) {
  app.post("/zenity", (req, res) => {
    const args = req.body;

    const child = spawn(
      path.join(rootdir, platform.win ? "zenity.exe" : "zenity"),
      args,
      { detached: true }
    );

    child.stdout.on("data", (data) => {
      res.send({ result: String(data) });
    });

    child.stderr.on("data", (error) => {
      console.error(String(error));
    });
  });
}

export default zenity;
