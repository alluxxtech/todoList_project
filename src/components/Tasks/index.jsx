import React from "react";
import axios from "axios";

import "./Tasks.scss";
import editSvg from "../../assets/img/edit-black-18dp.svg";
import AddTaskForm from "./AddTaskForm";

export default function Tasks({ list, onEditTitle, onAddTask }) {
  const editTitle = () => {
    const newTitle = window.prompt("Title name", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Не удалось обновить названи списска");
        });
    }
  };

  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list && list.name}
        <img onClick={editTitle} src={editSvg} alt="edit icon" />
      </h2>
      <div className="tasks__items">
        {!list?.tasks.length && <h2>No tasks</h2>}
        {list?.tasks.map((task) => (
          <div key={task.id} className="tasks__items-row">
            <div className="checkbox">
              <input id={`task-${task.id}`} type="checkbox" />
              <label htmlFor={`task-${task.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  width="18px"
                  height="18px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </label>
            </div>
            <input readOnly value={task.text} />
          </div>
        ))}
        <AddTaskForm list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
}
