import { h, Fragment } from "preact";
import usePooling from "./utils/usePooling";
import Widget from "./base/Widget";
import LightsAndSwitches from "./LightsAndSwitches";
import TVControl from "./TVControl";
import FancyClock from "./FancyClock";
import Stats from "./Stats";
import Spotify from "./Spotify";
import Habitica from "./Habitica";
import Bookmarks from "./Bookmarks";
import HRLocker from "./HRLocker";
import UpcomingShows from "./UpcomingShows";
import Torrent from "./Torrent";
import ReloadButton from "./ReloadButton";
import Tweet from "./Tweet";

function parseHassState(json: any): HomeAssistantEntityMap {
  return json.reduce(
    (acc: HomeAssistantEntityMap, entity: BaseHomeAssistantEntity) => ({
      ...acc,
      [entity.entity_id]: entity,
    }),
    {}
  );
}

function App() {
  const [hass, , setHass] = usePooling<HomeAssistantEntityMap>(
    "/home-assistant/states",
    5000,
    parseHassState
  );

  return (
    <Fragment>
      <ReloadButton />
      <Widget right={40} left="50%">
        <Tweet />
      </Widget>
      <Widget top={120} left="50%">
        <FancyClock />
      </Widget>
      <Widget top={370} left="calc(50% - 100px)" width={200}>
        <Stats />
      </Widget>
      <Widget top={40} right={12} width={300}>
        <Spotify hass={hass} setHass={setHass} />
      </Widget>
      <Widget left={12} bottom={45}>
        <LightsAndSwitches hass={hass} />
      </Widget>
      <Widget left={200} bottom={45}>
        <UpcomingShows />
      </Widget>
      <Widget right={12} bottom={45}>
        <TVControl />
      </Widget>
      <Widget left={12} top={40} width={250}>
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
      <Widget right={120} bottom={45}>
        <HRLocker />
      </Widget>
      <Widget right={305} bottom={45} width={200}>
        <Torrent />
      </Widget>
    </Fragment>
  );
}

export default App;
