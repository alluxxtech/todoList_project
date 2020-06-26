import React from "react";
import clearSvg from "./../../assets/img/clear-black-18dp.svg";
import classNames from "classnames";
import axios from "axios";

import Badge from "../Badge/index";

import "./List.scss";

const List = ({ items, isRemovable, onListClick, onRemove, onClickItem, activeItem }) => {
  const removeList = (item) => {
    if (window.confirm(`You want remove list ${item.name}?`)) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul onClick={onListClick} className="list">
      {items.map((item, idx) => {
        return (
          <li
            key={idx}
            className={classNames(item.className, {
              active: item.active ? item.active : activeItem && activeItem.id === item.id,
            })}
            onClick={onClickItem ? () => onClickItem(item) : null}
          >
            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
            <span>
              {item.name}
              {item.tasks && ` (${item.tasks.length})`}
            </span>
            {isRemovable && (
              <img
                onClick={() => removeList(item)}
                className="list__remove-icon"
                src={clearSvg}
                alt="remove icon"
              ></img>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
