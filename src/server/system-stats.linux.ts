import os from "os";
import si from "systeminformation";
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
    si.currentLoad(({ currentLoad }) => resolve(currentLoad));
  });
}

function getDisks() {
  return new Promise<SystemStats["disks"]>((resolve) => {
    si.fsSize((disks) =>
      resolve(
        // disks.reduce((acc, disk) => ({ ...acc, [disk.mount]: disk.use }), {})
        { "/": disks[0].use }
      )
    );
  });
}

function systemStats(app: Express) {
  const state: SystemStats = { vpn: false, memory: 0, cpu: 0, disks: {} };

  function update() {
    Promise.all([getMemory(), getCPU(), getDisks()]).then(
      ([memory, cpu, disks]) => {
        state.vpn = undefined;
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

  app.post("/system-stats/vpn/toggle", (_, res) => {
    res.send({ result: true });
  });
}

export default systemStats;
