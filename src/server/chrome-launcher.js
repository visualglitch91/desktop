import { exec } from "child_process";

function chromeLauncher(app) {
  app.post("/chrome-launcher", (req, res) => {
    const { url } = req.body;

    exec(`start "" "${url}"`, { windowsHide: true });

    res.sendStatus(200);
  });
}

export default chromeLauncher;
