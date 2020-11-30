import path from "path";
import express from "express";

import homeAssistant from "./home-assistant";
import systemStats from "./system-stats";
import habitica from "./habitica";

const PORT = process.env.PORT || 4123;
const app = express();
app.use(express.static(path.join(__dirname, "client")));

homeAssistant(app);
systemStats(app);
habitica(app);

app.listen(PORT, () => console.log("listening on port", PORT));
