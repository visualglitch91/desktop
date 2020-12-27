import { h } from "preact";
import { useMemo } from "preact/hooks";
import { DAY, timeAgo } from "../utils/date";
import usePooling from "../utils/usePooling";
import zenity from "../utils/zenity";
import { post } from "../utils/api";
import FadeIn from "../base/FadeIn";
import ProgressBar from "../base/ProgressBar";
import Checkbox from "../base/Checkbox";
import ListItem from "../base/ListItem";
import Text from "../base/Text";
import Icon from "../base/Icon";
import Spacer from "../base/Spacer";
import Button from "../base/Button";

function Habitica() {
  const [stats, refreshStats] = usePooling<HabiticaStats>(
    "/habitica/user",
    60 * 1000,
    (json) => json.data.stats
  );

  const [data, refreshData, setData] = usePooling<HabiticaTask[]>(
    "/habitica/tasks",
    60 * 1000
  );

  function score(task: HabiticaTask, direction: "up" | "down") {
    return post(`/habitica/tasks/${task.id}/score/${direction}`).then(() => {
      refreshStats();
      return; // don't wait
    });
  }

  function toggle(task: HabiticaTask) {
    score(task, task.completed ? "down" : "up").then(() => {
      setData((prevData) => {
        const data = [...(prevData || [])];
        const updatedTask: HabiticaTask = { ...task };

        updatedTask.completed = !updatedTask.completed;

        if (updatedTask.completed) {
          updatedTask.dateCompleted = Date.now().toString();
        }

        data[data.indexOf(task)] = updatedTask;

        return data;
      });
    });
  }

  function startTheDay() {
    return post("/habitica/cron", { data: {} }).then(() => {
      refreshStats();
      refreshData();
      return; // don't wait
    });
  }

  async function addTodo() {
    const text = await zenity(
      "--entry",
      "--title=Nova Tarefa",
      "--text=Digite a descrição da tarefa",
      "--width=250"
    );

    if (text) {
      await post("/habitica/tasks/user", { text, type: "todo" });
      refreshData();
    }
  }

  const tasks = useMemo(
    () =>
      data &&
      data.filter((task) => {
        return (
          (task.type === "daily" && task.isDue) ||
          (task.type === "todo" &&
            (!task.completed || timeAgo(task.dateCompleted) < 1.5 * DAY))
        );
      }),
    [data]
  );

  const habits = useMemo(
    () => data && data.filter((task) => task.type === "habit"),
    [data]
  );

  if (!tasks || !stats || !habits) {
    return <FadeIn key="root" visible={false} />;
  }

  return (
    <FadeIn key="root" visible>
      <ListItem>
        <Button onClick={startTheDay}>
          <Text size="sm">Começar o dia</Text>
        </Button>
      </ListItem>
      <Spacer />
      <ListItem style={{ maxWidth: 180 }}>
        <ProgressBar
          label={`HP: ${Math.floor(stats.hp)}/${Math.floor(stats.maxHealth)}`}
          value={(stats.hp / stats.maxHealth) * 100}
        />
      </ListItem>
      <Spacer />
      <ListItem style={{ maxWidth: 180 }}>
        <ProgressBar
          label={`LEVEL ${stats.lvl}: ${stats.exp}/${stats.toNextLevel}`}
          value={(stats.exp / stats.toNextLevel) * 100}
        />
      </ListItem>
      <Spacer />
      <ListItem extraMargin>
        <Text>Hábitos</Text>
      </ListItem>
      {habits.map((habit) => (
        <ListItem key={habit.id}>
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
          <Text ellipsis>{habit.text}</Text>
        </ListItem>
      ))}
      <Spacer />
      <ListItem extraMargin>
        <Text>
          Tarefas
          <Icon
            hoverable
            marginLeft
            name="plus-box-outline"
            onClick={addTodo}
          />
        </Text>
      </ListItem>
      {tasks.map((task) => (
        <ListItem key={task.id} hoverable onClick={() => toggle(task)}>
          <Checkbox marginRight checked={task.completed} />
          <Text ellipsis>{task.text}</Text>
        </ListItem>
      ))}
    </FadeIn>
  );
}

export default Habitica;
