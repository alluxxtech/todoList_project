import React, { useState, useEffect } from "react";
import axios from "axios";

import List from "../List";
import Badge from "../Badge/index";

import closeSvg from "../../assets/img/cancel-black-18dp.svg";

import "./AddList.scss";

const AddList = ({ colors, onAddList }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(() => {
    if (Array.isArray(colors)) {
      return colors[0].id;
    }
  });
  const [inputValue, setInpuValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInpuValue("");
    setSelectedColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert("enter list name");
      return;
    }

    setIsLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0].name;
        const listObj = {
          ...data,
          color: {
            name: color,
          },
        };
        onAddList({
          listObj,
        });
        onClose();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="add-list">
      <List
        onListClick={() => setVisiblePopup(true)}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            ),
            name: "Add list",
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img onClick={onClose} src={closeSvg} alt="close btn" className="add-list__popup-close-btn"></img>
          <input
            onChange={(e) => setInpuValue(e.target.value)}
            value={inputValue}
            className="field"
            type="text"
            placeholder="List name"
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => {
              return (
                <Badge
                  onClick={() => setSelectedColor(color.id)}
                  key={color.id}
                  color={color.name}
                  className={selectedColor === color.id && "active"}
                />
              );
            })}
          </div>
          <button onClick={addList} className="button">
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
