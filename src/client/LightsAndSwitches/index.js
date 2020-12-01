import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import ListItem from "../base/ListItem";
import Text from "../base/Text";
import Toggle from "../base/Toggle";

const entities = require("./entities.json");

function LightsAndSwitches({ hass }) {
  const [states, setStates] = useState();

  function toggle(entity) {
    setStates((states) => ({
      ...states,
      [entity.entityId]: {
        ...states[entity.entityId],
        state: states[entity.entityId].state === "on" ? "off" : "on",
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
    <div>
      {entities.map((entity, index) => (
        <ListItem key={index} hoverable onClick={() => toggle(entity)}>
          <Text>
            <Toggle
              marginRight
              size="lg"
              checked={states[entity.entityId].state === "on"}
            />
            {entity.name}
          </Text>
        </ListItem>
      ))}
    </div>
  );
}

export default LightsAndSwitches;
