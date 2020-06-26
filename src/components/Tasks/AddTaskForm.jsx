import React, { useState } from "react";
import addSvg from "../../assets/img/add-black-18dp.svg";
import axios from "axios";

export default function AddTaskForm({ list, onAddTask }) {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const tooggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue("");
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        console.log("data1", data);
        onAddTask(list.id, obj);
        tooggleFormVisible();
      })
      .catch(() => {
        alert("Add task error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={tooggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="add task" />
          <span>New task</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="field"
            type="text"
            placeholder="Task text"
          />
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? "Adding..." : "Add task"}
          </button>
          <button onClick={tooggleFormVisible} className="button button--grey">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
