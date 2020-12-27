import { h } from "preact";
import { post } from "../utils/api";
import AutoFadeIn from "../base/AutoFadeIn";
import Button from "../base/Button";
import Text from "../base/Text";
import "./styles.css";

function HRLocker() {
  function run(action: HRLockerActions) {
    post("/lazy-seal-12/hr-locker", { action });
  }

  return (
    <AutoFadeIn className="hrlocker">
      <Text className="hrlocker__label">HRLocker</Text>
      <div className="hrlocker__buttons">
        <Button onClick={() => run("clock_in")}>
          <Text size="sm">Clock In</Text>
        </Button>
        <Button onClick={() => run("break_start")}>
          <Text size="sm">Break Start</Text>
        </Button>
      </div>
      <div className="hrlocker__buttons">
        <Button onClick={() => run("break_over")}>
          <Text size="sm">Break Over</Text>
        </Button>
        <Button onClick={() => run("clock_out")}>
          <Text size="sm">Clock Out</Text>
        </Button>
      </div>
    </AutoFadeIn>
  );
}

export default HRLocker;
