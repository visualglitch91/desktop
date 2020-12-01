import { h } from "preact";
import { useMemo } from "preact/hooks";
import usePooling from "../utils/usePooling";
import ProgressBar from "../base/ProgressBar";
import Checkbox from "../base/Checkbox";
import ListItem from "../base/ListItem";
import Text from "../base/Text";
import Icon from "../base/Icon";
import Spacer from "../base/Spacer";

function Habitica() {
  const [stats, refreshStats] = usePooling<HabiticaStats>(
    "/habitica/stats",
    60 * 1000
  );

  const [data, , setData] = usePooling<HabiticaTask[]>(
    "/habitica/tasks",
    60 * 1000
  );

  function score(task: HabiticaTask, direction: "up" | "down") {
    return fetch(`/habitica/tasks/${task.id}/score/${direction}`, {
      method: "POST",
    }).then(() => {
      refreshStats();
      return; // don't wait
    });
  }

  function toggle(task: HabiticaTask) {
    score(task, task.completed ? "down" : "up").then(() => {
      setData((prevData) => {
        const data = prevData ? [...prevData] : [];
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

  if (!tasks || !stats || !habits) {
    return null;
  }

  return (
    <div>
      <ListItem>
        <ProgressBar
          label={`HP: ${stats.hp}/${stats.maxHealth}`}
          value={(stats.hp / stats.maxHealth) * 100}
        />
      </ListItem>
      <Spacer />
      <ListItem>
        <ProgressBar
          label={`LEVEL: ${stats.exp}/${stats.toNextLevel}`}
          value={(stats.exp / stats.toNextLevel) * 100}
        />
      </ListItem>
      <Spacer />
      <ListItem extraMargin>
        <Text>Hábitos</Text>
      </ListItem>
      {habits.map((habit) => (
        <ListItem key={habit.id}>
          <Text>
            {habit.down && (
              <Icon
                hoverable
                marginRight
                name="minus-box-outline"
                onClick={() => score(habit, "down")}
              />
            )}
            {habit.up && (
              <Icon
                hoverable
                marginRight
                name="plus-box-outline"
                onClick={() => score(habit, "up")}
              />
            )}
            {habit.text}
          </Text>
        </ListItem>
      ))}
      <Spacer />
      <ListItem extraMargin>
        <Text>Tarefas</Text>
      </ListItem>
      {tasks.map((task) => (
        <ListItem key={task.id} hoverable onClick={() => toggle(task)}>
          <Checkbox marginRight checked={task.completed} />
          {task.text}
        </ListItem>
      ))}
    </div>
  );
}

export default Habitica;
