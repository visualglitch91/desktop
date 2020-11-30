import { h } from "preact";
import "./HRLocker.css";

function HRLocker() {
  function run(action) {
    fetch("/lazy-seal-12", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "hr-locker", action }),
    });
  }

  return (
    <div className="HRLocker">
      <div className="HRLocker__Row HRLocker__Label">HRLocker</div>
      <div className="HRLocker__Row">
        <div className="HRLocker__Action" onClick={() => run("clock_in")}>
          Clock In
        </div>
        <div className="HRLocker__Action" onClick={() => run("break_start")}>
          Break Start
        </div>
      </div>
      <div className="HRLocker__Row">
        <div className="HRLocker__Action" onClick={() => run("break_over")}>
          Break Over
        </div>
        <div className="HRLocker__Action" onClick={() => run("clock_out")}>
          Clock Out
        </div>
      </div>
    </div>
  );
}

export default HRLocker;
