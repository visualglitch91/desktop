import { h } from "preact";
import AutoFadeIn from "../base/AutoFadeIn";
import Button from "../base/Button";
import Text from "../base/Text";
import "./styles.css";

function HRLocker() {
  function run(action: HRLockerActions) {
    fetch("/lazy-seal-12", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "hr-locker", action }),
    });
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
