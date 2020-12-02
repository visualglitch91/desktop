import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import AutoFadeIn from "../base/AutoFadeIn";
import "./styles.css";

function getTime(date: Date) {
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);

  return `${hours}:${minutes}`;
}

function FancyClock() {
  const [, forceRerender] = useState(0);
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
    <AutoFadeIn className="fancy-clock">
      <div className="fancy-clock__time">{getTime(date)}</div>
      <div className="fancy-clock__weekday">
        {date
          .toLocaleString("pt-BR", { weekday: "long" })
          .replace("-feira", "")}
      </div>
      <div className="fancy-clock__date">
        {date.toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </AutoFadeIn>
  );
}

export default FancyClock;
