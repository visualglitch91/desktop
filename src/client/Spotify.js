import { h } from "preact";
import "./Spotify.css";

function Spotify({ hass }) {
  const data = hass && hass["media_player.spotify_visualglitch91"];
  const attributes = data && data.attributes;

  if (!attributes || !attributes.media_title) {
    return null;
  }

  return (
    <div className="Spotify">
      <div className="Spotify__Details">
        <div className="Spotify__Title">{attributes.media_title}</div>
        <div className="Spotify__Artist">{attributes.media_artist}</div>
      </div>
      <img
        className="Spotify__AlbumPic"
        src={`http://localhost:8123${attributes.entity_picture}`}
      />
    </div>
  );
}

export default Spotify;
