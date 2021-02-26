import { h } from "preact";
import { post } from "../utils/api";
import AutoFadeIn from "../base/AutoFadeIn";
import Icon from "../base/Icon";
import Text from "../base/Text";
import "./styles.css";
import Panel from "../base/Panel";

interface Command {
  type: "script" | "scene";
  entityId: string;
}

const commands: { [key: string]: Command } = {
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
  function run(command: Command) {
    post(`home-assistant/services/${command.type}/turn_on`, {
      entity_id: command.entityId,
    });
  }

  return (
    <AutoFadeIn className="tvcontrol">
      <Panel>
        <div className="tvcontrol__row">
          <Text>Controle da TV</Text>
        </div>
        <div className="tvcontrol__row">
          <Icon
            hoverable
            name="rewind"
            onClick={() => run(commands.prev_media)}
          />
          <Icon
            hoverable
            name="play-pause"
            onClick={() => run(commands.play_pause)}
          />
          <Icon
            hoverable
            name="fast-forward"
            onClick={() => run(commands.next_media)}
          />
        </div>
        <div className="tvcontrol__row">
          <Icon
            hoverable
            name="volume-minus"
            onClick={() => run(commands.volume_down)}
          />
          <Icon
            hoverable
            name="volume-off"
            onClick={() => run(commands.volume_off)}
          />
          <Icon
            hoverable
            name="volume-plus"
            onClick={() => run(commands.volume_up)}
          />
        </div>
      </Panel>
    </AutoFadeIn>
  );
}

export default TVControl;
