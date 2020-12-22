import { h } from "preact";
import { StateUpdater } from "preact/hooks";
import { post } from "../utils/api";
import FadeIn from "../base/FadeIn";
import Icon from "../base/Icon";
import Text from "../base/Text";
import "./styles.css";

const entityId = "media_player.spotify_visualglitch91";

function Spotify({
  hass,
  setHass,
}: {
  hass: HomeAssistantEntityMap | undefined;
  setHass: StateUpdater<HomeAssistantEntityMap | undefined>;
}) {
  const entity = hass && (hass[entityId] as HomeAssistantMediaPlayerEntity);
  const attributes = entity && entity.attributes;

  function callService(service: string) {
    post(`/home-assistant/services/media_player/${service}`, {
      entity_id: entityId,
    }).then(([state]: [HomeAssistantMediaPlayerEntity]) => {
      setHass((entities) => ({ ...entities, [state.entity_id]: state }));
    });
  }

  if (!attributes || !attributes.media_title) {
    return <FadeIn key="root" visible={false} />;
  }

  return (
    <FadeIn key="root" visible>
      <div className="spotify">
        <div className="spotify__details">
          <Text ellipsis monospace size="lg">
            {attributes.media_title}
          </Text>
          <Text ellipsis monospace size="md">
            {attributes.media_artist}
          </Text>
        </div>
        <div className="spotify__album-pic-wrapper">
          <div
            className="spotify__play-pause"
            onClick={() => callService("media_play_pause")}
          >
            <Icon size="lg" name="play-pause" />
          </div>
          <img
            className="spotify__album-pic"
            key={attributes.entity_picture}
            src={`http://192.168.0.16:8123${attributes.entity_picture}`}
          />
        </div>
      </div>
      <div className="spotify__buttons">
        <Icon
          hoverable
          name="rewind"
          onClick={() => callService("media_previous_track")}
        />
        <Icon
          hoverable
          name="fast-forward"
          onClick={() => callService("media_next_track")}
        />
      </div>
    </FadeIn>
  );
}

export default Spotify;
