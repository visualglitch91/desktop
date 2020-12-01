import { exec } from "child_process";
import { Express } from "express";

function chromeLauncher(app: Express) {
  app.post("/chrome-launcher", (req, res) => {
    const { url } = req.body;

    exec(`start "" "${url}"`, { windowsHide: true });

    res.sendStatus(200);
  });
}

export default chromeLauncher;
