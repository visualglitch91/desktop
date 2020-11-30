import { h } from "preact";
import Icon from "./Icon";
import "./TVControl.css";

const commands = {
  prev_media: {
    type: "script",
    entityId: "script.android_tv_prev_media",
  },
  play_pause: {
    type: "script",
    entityId: "script.android_tv_play_pause",
  },
  next_media: {
    type: "script",
    entityId: "script.android_tv_next_media",
  },
  volume_down: {
    type: "scene",
    entityId: "scene.txn9cjh17unpojnb",
  },
  volume_off: {
    type: "scene",
    entityId: "scene.xmsukevimp9d4ykn",
  },
  volume_up: {
    type: "scene",
    entityId: "scene.2pfs2aqgwxrxqifa",
  },
};

function TVControl() {
  function run(command) {
    fetch(`home-assistant/${command.type}/${command.entityId}/run`);
  }

  return (
    <div className="TVControl">
      <div className="TVControl__Row TVControl__Label">Controle da TV</div>
      <div className="TVControl__Row">
        <Icon name="rewind" onClick={() => run(commands.prev_media)} />
        <Icon name="play-pause" onClick={() => run(commands.play_pause)} />
        <Icon name="fast-forward" onClick={() => run(commands.next_media)} />
      </div>
      <div className="TVControl__Row">
        <Icon name="volume-minus" onClick={() => run(commands.volume_down)} />
        <Icon name="volume-off" onClick={() => run(commands.volume_off)} />
        <Icon name="volume-plus" onClick={() => run(commands.volume_up)} />
      </div>
    </div>
  );
}

export default TVControl;
