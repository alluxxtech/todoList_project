import React from "react";
import clearSvg from "./../../assets/img/clear-black-18dp.svg";
import classNames from "classnames";

import Badge from "../Badge/index";

import "./List.scss";

const List = ({ items, isRemovable, onListClick, onRemove }) => {
  const removeList = (item) => {
    if (window.confirm(`You want remove list ${item.name}?`)) {
      onRemove(item);
    }
  };

  return (
    <ul onClick={onListClick} className="list">
      {items.map((item, idx) => {
        return (
          <li key={idx} className={classNames(item.className, { active: item.active })}>
            <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
            <span>{item.name}</span>
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
