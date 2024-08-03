import React, { useContext } from "react";
import "./FilterBtn.css";
import { ProgressContext } from "../../context/ProgressContext";
import { AppContext } from "../../context/AppContext";

const FilterBtn = ({ level }) => {
  const { filter, setFilter } = useContext(AppContext);
  const { levelQuestions } = useContext(ProgressContext);

  // setting filter state value
  const filterBtnClick = (e) => {
    let id = e.target.getAttribute("id");
    setFilter(id);
  };
  return (
    <button
      id={level}
      className={`filter-btn ${
        filter === level && "clicked"
      }`}
      onClick={filterBtnClick}
    >
      {level} ({levelQuestions(level)})
    </button>
  );
};

export default FilterBtn;
