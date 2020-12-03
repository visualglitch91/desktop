interface Bookmark {
  name: string;
  url: string;
  icon: string;
}

interface Episode {
  date: string;
  show: string;
  season: number;
  number: number;
  title: string;
}

interface Torrent {
  name: string;
  downloaded: number;
  size: number;
}

interface TorrentState {
  running: boolean;
  torrents: Torrent[];
}

interface HabiticaStats {
  hp: number;
  maxHealth: number;
  exp: number;
  toNextLevel: number;
  lvl: number;
}

type HabiticaTask = {
  id: string;
  type: "todo" | "daily" | "habit";
  text: string;
  isDue: boolean;
  up: boolean;
  down: boolean;
} & (
  | {
      completed: false;
      dateCompleted: undefined;
    }
  | {
      completed: true;
      dateCompleted: string;
    }
);

type HRLockerActions = "clock_in" | "break_start" | "break_over" | "clock_out";

interface BaseHomeAssistantEntity {
  entity_id: string;
  state: "on" | "off";
  type: string;
  attributes: any;
}

interface HomeAssistantMediaPlayerEntity extends BaseHomeAssistantEntity {
  attributes: {
    media_title?: string;
    media_artist?: string;
    entity_picture?: string;
  };
}

type HomeAssistantEntityMap = { [entityId: string]: BaseHomeAssistantEntity };

interface SystemStats {
  vpn: boolean;
  memory: number;
  cpu: number;
  disks: { [key: string]: number };
}
