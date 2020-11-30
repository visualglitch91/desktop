import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Toggle from "./Toggle";
import "./LightsAndSwitches.css";

const entities = require("./LightsAndSwitches__entities.json");

function LightsAndSwitches({ hass }) {
  const [states, setStates] = useState();

  function toggle(entity) {
    setStates((states) => ({
      ...states,
      [entity.entityId]: {
        ...states[entity.entityId],
        state: states[entity.entityId] === "on" ? "off" : "on",
      },
    }));

    fetch(`home-assistant/${entity.type}/${entity.entityId}/toggle`);
  }

  useEffect(() => {
    setStates(hass);
  }, [hass]);

  if (!states) {
    return null;
  }

  return (
    <ul className="LightsAndSwitches">
      {entities.map((entity, index) => (
        <li key={index} onClick={() => toggle(entity)}>
          <Toggle
            className="LightsAndSwitches__Toggle"
            checked={states[entity.entityId].state === "on"}
          />
          {entity.name}
        </li>
      ))}
    </ul>
  );
}

export default LightsAndSwitches;
