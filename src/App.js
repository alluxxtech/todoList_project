import React, { useState, useEffect } from "react";
import axios from "axios";

import { List, AddList, Tasks } from "./components";

import db from "./assets/db.json";

// fetch('http://localhost:3001/lists?_expand=color').then(res => res.json()).then(json => {

// })

function App() {
  const [lists, setLists] = useState(
    []
    // db.lists.map((item) => {
    //   item.color = db.colors.filter((color) => color.id === item.colorId)[0]?.name || null;
    //   return item;
    // })
  );
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

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

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              active: true,
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
          onClickItem={(item) => setActiveItem(item)}
          activeItem={activeItem}
          isRemovable
        />
        <AddList onAddList={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        {lists && <Tasks list={activeItem} onAddTask={onAddTask} onEditTitle={onEditListTitle} />}
      </div>
    </div>
  );
}

export default App;
