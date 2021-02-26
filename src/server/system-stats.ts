/* eslint-disable @typescript-eslint/no-var-requires */
import platform from "./platform";

export default platform.win
  ? require("./system-stats.win").default
  : require("./system-stats.linux").default;
