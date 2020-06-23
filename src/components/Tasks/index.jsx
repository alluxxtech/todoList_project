import React from "react";
import "./Tasks.scss";
import editSvg from "../../assets/img/edit-black-18dp.svg";

export default function Tasks() {
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        Frontend
        <img src={editSvg} alt="edit icon" />
      </h2>
      <div className="tasks__items">
        <div className="tasks__items-row">
          <div className="checkbox">
            <input id="check" type="checkbox" />
            <label htmlFor="check">
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
          <input value="ReactJs Hooks(useState, useReducer, useEffect etc.)" />
        </div>
      </div>
    </div>
  );
}
