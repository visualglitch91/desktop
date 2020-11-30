import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import "./FancyClock.css";

function getTime(date) {
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);

  return `${hours}:${minutes}`;
}

function FancyClock() {
  const [, forceRerender] = useState();
  const date = new Date();

  useEffect(() => {
    const interval = setInterval(() => {
      forceRerender(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="FancyClock">
      <div className="FancyClock__Time">{getTime(date)}</div>
      <div className="FancyClock__Weekday">
        {date
          .toLocaleString("pt-BR", { weekday: "long" })
          .replace("-feira", "")}
      </div>
      <div className="FancyClock__Date">
        {date.toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
}

export default FancyClock;
