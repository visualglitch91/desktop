import { h } from "preact";
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
    <div className="hrlocker">
      <div className="hrlocker__row hrlocker__label">
        <Text>HRLocker</Text>
      </div>
      <div className="hrlocker__row">
        <Text hoverable onClick={() => run("clock_in")}>
          Clock In
        </Text>
        <Text hoverable onClick={() => run("break_start")}>
          Break Start
        </Text>
      </div>
      <div className="hrlocker__row">
        <Text hoverable onClick={() => run("break_over")}>
          Break Over
        </Text>
        <Text hoverable onClick={() => run("clock_out")}>
          Clock Out
        </Text>
      </div>
    </div>
  );
}

export default HRLocker;
