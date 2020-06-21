import React from "react";
import List from "./components/List/index";
import AddList from "./components/AddList";

import db from "./assets/db.json";

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
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
              active: true,
            },
          ]}
        />
        <List
          items={[
            {
              color: "green",
              name: "Purchases",
            },
            {
              color: "blue",
              name: "Frontend",
              active: true,
            },
            {
              color: "pink",
              name: "Films and series",
            },
          ]}
          isRemovable
        />
        <AddList colors={db.colors} />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
