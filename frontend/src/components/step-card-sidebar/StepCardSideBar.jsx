import React, { useContext } from "react";
import "./StepCardSideBar.css";
import { ThemeContext } from "../../context/ThemeContext";

const StepCardSideBar = (props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="step-card-sidebar">
      <div className="step-number">{props.id}</div>
      <div className={`step-title ${theme === "light" && "light-mode"}`}>
        {props.title}
      </div>
    </div>
  );
};

export default StepCardSideBar;