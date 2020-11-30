import fetch from "node-fetch";
import { h } from "preact";
import Icon from "./Icon";
import "./Spotify.css";

const entityId = "media_player.spotify_visualglitch91";

function Spotify({ hass, setHass }) {
  const data = hass && hass[entityId];
  const attributes = data && data.attributes;

  if (!attributes || !attributes.media_title) {
    return null;
  }

  function callService(service) {
    fetch(`/home-assistant/services/media_player/${service}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity_id: entityId }),
    }).then(([state]) => {
      setHass((entities) => ({ ...entities, [state.entity_id]: state }));
    });
  }

  return (
    <div>
      <div className="Spotify">
        <div className="Spotify__Details">
          <div className="Spotify__Title">{attributes.media_title}</div>
          <div className="Spotify__Artist">{attributes.media_artist}</div>
        </div>
        <div className="Spotify_AlbumPicWrapper">
          <div
            className="Spotify_PlayPause"
            onClick={() => callService("media_play_pause")}
          >
            <Icon name="play-pause" />
          </div>
          <img
            className="Spotify__AlbumPic"
            src={`http://localhost:8123${attributes.entity_picture}`}
          />
        </div>
      </div>
      <div className="Spotify_Buttons">
        <Icon
          name="rewind"
          onClick={() => callService("media_previous_track")}
        />
        <Icon
          name="fast-forward"
          onClick={() => callService("media_next_track")}
        />
      </div>
    </div>
  );
}

export default Spotify;
