import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Tasks.scss";
import editSvg from "../../assets/img/edit-black-18dp.svg";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

export default function Tasks({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
}) {
  const editTitle = () => {
    const newTitle = window.prompt("Title name", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Не удалось обновить названи списка");
        });
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list?.color.hex }} className="tasks__title">
          {list && list.name}
          <img onClick={editTitle} src={editSvg} alt="edit icon" />
        </h2>
      </Link>
      <div className="tasks__items">
        {!withoutEmpty && !list?.tasks.length && <h2>No tasks</h2>}
        {list?.tasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            onComplete={onCompleteTask}
            list={list}
            onRemove={onRemoveTask}
            onEdit={onEditTask}
          />
        ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
}
