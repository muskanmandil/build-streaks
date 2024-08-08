import React, { useContext } from "react";
import "./ThemeToggleBtn.css";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggleBtn = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <div className="theme-toggle-btn">
      <input
        type="checkbox"
        id="checkbox"
        checked={theme==='dark' ? true : false}
        onChange={toggleTheme}
      />
      <label className="theme-switch" htmlFor="checkbox">
        <i className="fas fa-sun"></i>
        <i className="fas fa-moon"></i>
        <span className="ball"></span>
      </label>
    </div>
  );
};

export default ThemeToggleBtn;
