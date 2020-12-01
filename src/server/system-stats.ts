import os from "os";
import { spawn } from "child_process";
import { Express } from "express";

function getMemory() {
  try {
    const total = parseInt(String(os.totalmem()), 10);
    const free = parseInt(String(os.freemem()), 10);
    const used = Number((((total - free) / total) * 100).toFixed(2));

    return Promise.resolve(used);
  } catch (err) {
    return Promise.resolve(0);
  }
}

function getCPU() {
  return new Promise<number>((resolve) => {
    spawn("wmic", ["cpu", "get", "loadpercentage", "/value"], {
      detached: true,
    }).stdout.on("data", (data) => {
      try {
        const output =
          (/LoadPercentage=([0-9]*)/.exec(String(data)) || [])[1] || "0";

        resolve(Number(output));
      } catch (err) {
        resolve(0);
      }
    });
  });
}

function getDisks() {
  return new Promise<SystemStats["disks"]>((resolve) => {
    spawn(
      "wmic",
      ["LOGICALDISK", "GET", "Name,", "Size,", "FreeSpace", "/value"],
      { detached: true }
    ).stdout.on("data", (data) => {
      try {
        const output = String(data);
        const segments = output.split("\n");
        const disks: SystemStats["disks"] = {};

        for (let i = 0; i < segments.length; ++i) {
          if (segments[i].includes("FreeSpace")) {
            const _free = segments[i].split("=")[1].split("\r\r")[0];

            if (!_free) {
              return;
            }

            const free = parseInt(_free, 10);

            const filesystem = segments[i + 1].split("=")[1].split("\r\r")[0];

            const total = parseInt(
              segments[i + 2].split("=")[1].split("\r\r")[0],
              10
            );

            const used = Number((((total - free) / total) * 100).toFixed(2));

            disks[filesystem] = used;
          }
        }

        return resolve(disks);
      } catch (err) {
        return resolve({});
      }
    });
  });
}

function systemStats(app: Express) {
  const state: SystemStats = { memory: 0, cpu: 0, disks: {} };

  function update() {
    Promise.all([getMemory(), getCPU(), getDisks()]).then(
      ([memory, cpu, disks]) => {
        state.memory = memory;
        state.cpu = cpu;
        state.disks = disks;
      }
    );
  }

  setInterval(update, 5000);
  update();

  app.get("/system-stats", (_, res) => {
    res.send(state);
  });
}

export default systemStats;
