import fetch from "node-fetch";
import { Express } from "express";

const API = "http://127.0.0.1:8123/api";
const { HOME_ASSISTANT: TOKEN } = require("./secrets.json");

function homeAssistant(app: Express) {
  app.get("/home-assistant/states", (_, res) => {
    fetch(`${API}/states`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
      .then((res) => res.json())
      .then((json) => res.send(json));
  });

  app.get("/home-assistant/states/:entityId", (req, res) => {
    const { entityId } = req.params;

    fetch(`${API}/states/${entityId}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
      .then((res) => res.json())
      .then((json) => res.send(json));
  });

  app.get("/home-assistant/switch/:entityId/toggle", (req, res) => {
    const { entityId } = req.params;

    fetch(`${API}/services/switch/toggle`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify({ entity_id: entityId }),
    })
      .then((res) => res.json())
      .then((json) => res.send(json));
  });

  app.get("/home-assistant/light/:entityId/toggle", (req, res) => {
    const { entityId } = req.params;

    fetch(`${API}/services/light/toggle`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify({ entity_id: entityId }),
    })
      .then((res) => res.json())
      .then((json) => res.send(json));
  });

  app.get("/home-assistant/script/:entityId/run", (req, res) => {
    const { entityId } = req.params;

    fetch(`${API}/services/script/turn_on`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify({ entity_id: entityId }),
    })
      .then((res) => res.json())
      .then((json) => res.send(json));
  });

  app.get("/home-assistant/scene/:entityId/run", (req, res) => {
    const { entityId } = req.params;

    fetch(`${API}/services/scene/turn_on`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify({ entity_id: entityId }),
    })
      .then((res) => res.json())
      .then((json) => res.send(json));
  });

  app.post("/home-assistant/services/:service/:action", (req, res) => {
    const { service, action } = req.params;

    fetch(`${API}/services/${service}/${action}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify(req.body),
    })
      .then((res) => res.json())
      .then((json) => res.send(json));
  });
}

export default homeAssistant;
