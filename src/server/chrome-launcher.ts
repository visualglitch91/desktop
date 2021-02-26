import { exec } from "child_process";
import { Express } from "express";
import platform from "./platform";

function chromeLauncher(app: Express) {
  app.post("/chrome-launcher", (req, res) => {
    const { url } = req.body;

    if (platform.win) {
      exec(`start "" "${url}"`, { windowsHide: true });
    } else {
      exec(`xdg-open "${url}"`);
    }

    res.sendStatus(200);
  });
}

export default chromeLauncher;
