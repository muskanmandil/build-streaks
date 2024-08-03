import React, { useState } from "react";
import "./ThemeToggleBtn.css";

const ThemeToggleBtn = ({setTheme}) => {

  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme')==='dark');

  // toggle theme function for the button
  const toggleTheme = () => {

    const theme = localStorage.getItem("theme");

    // changing values because it is the toggling function
    if(theme==="dark"){
      setTheme('light');
      setIsDarkMode(false);
    }else{
      setTheme('dark');
      setIsDarkMode(true);
    } 
  };


  return (
    <div className="theme-toggle-btn">
      <label className="theme-switch" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <div className="slider round"></div>
      </label>
    </div>
  );
};

export default ThemeToggleBtn;
