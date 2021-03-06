import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { post } from "../utils/api";
import FadeIn from "../base/FadeIn";
import ListItem from "../base/ListItem";
import Text from "../base/Text";
import Toggle from "../base/Toggle";
import Panel from "../base/Panel";

interface LightsOrSwitchItem {
  entity_id: string;
  name: string;
  type: "switch" | "light";
}

//eslint-disable-next-line @typescript-eslint/no-var-requires
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

    post(`home-assistant/services/${item.type}/toggle`, {
      entity_id: item.entity_id,
    });
  }

  useEffect(() => {
    setStates(hass);
  }, [hass]);

  if (!states) {
    return <FadeIn key="root" visible={false} />;
  }

  return (
    <FadeIn key="root" visible>
      <Panel>
        {items.map(
          (item, index) =>
            states[item.entity_id] && (
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
            )
        )}
      </Panel>
    </FadeIn>
  );
}

export default LightsAndSwitches;
