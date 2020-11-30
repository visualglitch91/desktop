import { h, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import usePooling from "./usePooling";
import Widget from "./Widget";
import LightsAndSwitches from "./LightsAndSwitches";
import ReloadButton from "./ReloadButton";
import TVControl from "./TVControl";
import FancyClock from "./FancyClock";
import Stats from "./Stats";
import Spotify from "./Spotify";
import Habitica from "./Habitica";
import Bookmarks from "./Bookmarks";
import HRLocker from "./HRLocker";
import UpcomingShows from "./UpcomingShows";
import Torrent from "./Torrent";

function parseHassState(json) {
  return json.reduce(
    (acc, entity) => ({ ...acc, [entity.entity_id]: entity }),
    {}
  );
}

function App() {
  const [hass] = usePooling("/home-assistant/states", 5000, parseHassState);

  useEffect(() => {
    document.body.style.opacity = 1;
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
      <Widget left={200} bottom={40}>
        <UpcomingShows />
      </Widget>
      <Widget right={12} bottom={40}>
        <TVControl />
      </Widget>
      <Widget left={12} top={40}>
        <Habitica />
      </Widget>
      <Widget
        right={12}
        top={0}
        bottom={0}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Bookmarks />
      </Widget>
      <Widget right={120} bottom={40}>
        <HRLocker />
      </Widget>
      <Widget right={280} bottom={40} width={200}>
        <Torrent />
      </Widget>
    </Fragment>
  );
}

export default App;
