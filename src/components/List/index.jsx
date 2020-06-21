import React from "react";
import clearSvg from "./../../assets/img/clear-black-18dp.svg";
import classNames from "classnames";

import Badge from "../Badge/index";

import "./List.scss";

const List = ({ items, isRemovable, onListClick }) => {
  return (
    <ul onClick={onListClick} className="list">
      {items.map((item, idx) => {
        return (
          <li
            key={idx}
            className={classNames(item.className, { active: item.active })}
          >
            <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
            <span>{item.name}</span>
            {isRemovable ? (
              <i
                className={classNames(item.className, { active: item.active })}
              >
                <img src={clearSvg} alt="clear"></img>
              </i>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
