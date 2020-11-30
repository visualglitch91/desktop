import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import Widget from "./Widget";
import LightsAndSwitches from "./LightsAndSwitches";
import ReloadButton from "./ReloadButton";
import TVControl from "./TVControl";
import FancyClock from "./FancyClock";
import Stats from "./Stats";
import Spotify from "./Spotify";
import Habitica from "./Habitica";

function App() {
  const [hass, setHass] = useState();

  function refreshStates() {
    fetch("home-assistant/states")
      .then((res) => res.json())
      .then((json) =>
        json.reduce(
          (acc, entity) => ({ ...acc, [entity.entity_id]: entity }),
          {}
        )
      )
      .then(setHass);
  }

  useEffect(() => {
    refreshStates();

    const interval = setInterval(refreshStates, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Fragment>
      <Widget top={0} left={0}>
        <ReloadButton />
      </Widget>
      <Widget top={120} left="50%">
        <FancyClock />
      </Widget>
      <Widget top={370} left="calc(50% - 100px)" width={200}>
        <Stats />
      </Widget>
      <Widget top={40} right={12} width={300}>
        <Spotify hass={hass} />
      </Widget>
      <Widget left={12} bottom={40}>
        <LightsAndSwitches hass={hass} />
      </Widget>
      <Widget right={12} bottom={40}>
        <TVControl />
      </Widget>
      <Widget left={12} top={40}>
        <Habitica />
      </Widget>
    </Fragment>
  );
}

export default App;
