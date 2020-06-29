import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, useHistory, useLocation } from "react-router-dom";

import { List, AddList, Tasks } from "./components";

// fetch('http://localhost:3001/lists?_expand=color').then(res => res.json()).then(json => {

// })

function App() {
  const [lists, setLists] = useState(
    null
    // db.lists.map((item) => {
    //   item.color = db.colors.filter((color) => color.id === item.colorId)[0]?.name || null;
    //   return item;
    // })
  );
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:3001/lists?_expand=color&_embed=tasks").then(({ data }) => {
      setLists(data);
    });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
    return () => {
      // cleanup;
    };
  }, []);

  const onAddList = (obj) => {
    const newLists = [...lists, obj];
    setLists(newLists);
  };

  const onAddTask = (listId, taskObj) => {
    console.log(listId, taskObj);
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    const newLists = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newLists);
  };

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("You want to delete a task?")) {
      const newList = lists.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      axios.delete("http://localhost:3001/tasks/" + taskId).catch(() => {
        alert("Не удалось удалить задачу");
      });
    }
  };

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt("Task text", taskObj.text);
    if (!newTaskText) return;
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
    axios
      .patch("http://localhost:3001/tasks/" + taskObj.id, {
        text: newTaskText,
      })
      .catch(() => {
        alert("Не удалось удалить задачу");
      });
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
    axios
      .patch("http://localhost:3001/tasks/" + taskId, {
        completed,
      })
      .catch(() => {
        alert("Не удалось обновить задачу");
      });
  };

  useEffect(() => {
    const listId = location.pathname.split("lists/")[1];
    if (lists) {
      const list = lists.find((list) => list.id === Number(listId));
      setActiveItem(list);
    }
  }, [lists, location.pathname]);

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          onClickItem={(list) => {
            history.push("/");
          }}
          items={[
            {
              active: history.location.pathname === "/",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  width="18px"
                  height="18px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              ),
              name: "All tasks",
            },
          ]}
        />
        <List
          items={lists}
          onRemove={(id) => {
            const newLists = lists.filter((item) => item.id !== id);
            setLists(newLists);
          }}
          onClickItem={(list) => {
            // setActiveItem(list);
            history.push(`/lists/${list.id}`);
          }}
          activeItem={activeItem}
          isRemovable
        />
        <AddList onAddList={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        <Route exact path="/">
          {lists &&
            lists.map((list) => {
              return (
                <Tasks
                  key={list.id}
                  list={list}
                  onAddTask={onAddTask}
                  onEditTitle={onEditListTitle}
                  onRemoveTask={onRemoveTask}
                  onEditTask={onEditTask}
                  onCompleteTask={onCompleteTask}
                  withoutEmpty
                />
              );
            })}
        </Route>
        <Route path="/lists/:id">
          {lists && activeItem && (
            <Tasks
              list={activeItem}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onAddTask={onAddTask}
              onEditTitle={onEditListTitle}
              onCompleteTask={onCompleteTask}
            />
          )}
        </Route>
      </div>
    </div>
  );
}

export default App;
