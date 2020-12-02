import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import FadeIn from "../base/FadeIn";
import ListItem from "../base/ListItem";
import Text from "../base/Text";
import Toggle from "../base/Toggle";

interface LightsOrSwitchItem {
  entity_id: string;
  name: string;
  type: "switch" | "light";
}

const items: LightsOrSwitchItem[] = require("./items.json");

function LightsAndSwitches({
  hass,
}: {
  hass: HomeAssistantEntityMap | undefined;
}) {
  const [states, setStates] = useState(hass);

  function toggle(item: LightsOrSwitchItem) {
    setStates((_states) => {
      const states = _states as HomeAssistantEntityMap; // this should never be undefined at this point

      return {
        ...states,
        [item.entity_id]: {
          ...states[item.entity_id],
          state: states[item.entity_id].state === "on" ? "off" : "on",
        },
      };
    });

    fetch(`home-assistant/${item.type}/${item.entity_id}/toggle`);
  }

  useEffect(() => {
    setStates(hass);
  }, [hass]);

  if (!states) {
    return <FadeIn key="root" visible={false} />;
  }

  return (
    <FadeIn key="root" visible>
      {items.map((item, index) => (
        <ListItem key={index} hoverable onClick={() => toggle(item)}>
          <Text>
            <Toggle
              marginRight
              size="lg"
              checked={states[item.entity_id].state === "on"}
            />
            {item.name}
          </Text>
        </ListItem>
      ))}
    </FadeIn>
  );
}

export default LightsAndSwitches;
