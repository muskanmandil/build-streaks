import React, { useState } from "react";
import "./ThemeToggleBtn.css";

const ThemeToggleBtn = ({ setTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // toggle theme function for the button
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    const theme = localStorage.getItem("theme");

    // changing values because it is the toggling function
    if (theme === "dark") {
      setTheme("light");
      setIsDarkMode(false);
    } else {
      setTheme("dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="theme-toggle-btn">
      <input
        type="checkbox"
        id="checkbox"
        checked={isDarkMode}
        onChange={toggleTheme}
      />
      <label className="theme-switch" htmlFor="checkbox">
        <i class="fas fa-sun"></i>
        <i class="fas fa-moon"></i>
        <span class="ball"></span>
      </label>
    </div>
  );
};

export default ThemeToggleBtn;
