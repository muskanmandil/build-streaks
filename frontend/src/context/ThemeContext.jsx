import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const setDefaultTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    return storedTheme;
  } else {
    localStorage.setItem("theme", "dark");
    return "dark";
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(setDefaultTheme());

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
