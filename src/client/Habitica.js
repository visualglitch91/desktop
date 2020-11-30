import { h } from "preact";
import { useMemo } from "preact/hooks";
import usePooling from "./usePooling";
import Checkbox from "./Checkbox";
import Icon from "./Icon";
import ProgressBar from "./ProgressBar";
import "./Habitica.css";

function Habitica() {
  const [stats, refreshStats] = usePooling("/habitica/stats", 60 * 1000);
  const [data, , setData] = usePooling("/habitica/tasks", 60 * 1000);

  function score(task, direction) {
    return fetch(`/habitica/tasks/${task.id}/score/${direction}`, {
      method: "POST",
    }).then(() => {
      refreshStats();
      return; // don't wait
    });
  }

  function toggle(task) {
    score(task, task.completed ? "down" : "up").then(() => {
      setData((prevData) => {
        const data = [...prevData];
        const index = data.findIndex((it) => it.id === task.id);

        data[index] = { ...data[index], completed: !data[index].completed };

        return data;
      });
    });
  }

  const tasks = useMemo(
    () =>
      data &&
      data.filter(
        (task) => task.type === "todo" || (task.type === "daily" && task.isDue)
      ),
    [data]
  );

  const habits = useMemo(
    () => data && data.filter((task) => task.type === "habit"),
    [data]
  );

  if (!tasks || !stats) {
    return null;
  }

  return (
    <div className="Habitica">
      <ul>
        <li className="Habitica__Stat">
          <ProgressBar
            dark
            label={`HP: ${stats.hp}/${stats.maxHealth}`}
            value={(stats.hp / stats.maxHealth) * 100}
          />
        </li>
        <li className="Habitica__Stat">
          <ProgressBar
            dark
            label={`LEVEL: ${stats.exp}/${stats.toNextLevel}`}
            value={(stats.exp / stats.toNextLevel) * 100}
          />
        </li>
      </ul>
      <div className="Habitica__Label">Hábitos</div>
      <ul>
        {habits.map((habit) => (
          <li
            className="Habitica__Habit"
            key={habit.id}
            onClick={() => toggle(habit)}
          >
            {habit.down && (
              <Icon
                className="Habitica__Habit-Button"
                name="minus-box-outline"
                onClick={() => score(habit, "down")}
              />
            )}
            {habit.up && (
              <Icon
                className="Habitica__Habit-Button"
                name="plus-box-outline"
                onClick={() => score(habit, "up")}
              />
            )}
            <span>{habit.text}</span>
          </li>
        ))}
      </ul>
      <div className="Habitica__Label">Tarefas</div>
      <ul>
        {tasks.map((task) => (
          <li
            className="Habitica__Task"
            key={task.id}
            onClick={() => toggle(task)}
          >
            <Checkbox className="Habitica__Checkbox" checked={task.completed} />
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Habitica;
