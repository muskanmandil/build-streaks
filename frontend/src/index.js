import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from "./context/AppContext";
import ThemeToggleBtn from './components/theme-toggle-btn/ThemeToggleBtn';

// set theme function and maintaining theme token in localStorage
const setTheme = (theme) => {
  if(theme==='dark'){
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }else{
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}

// checking what theme to set on each load
const theme = localStorage.getItem('theme');
if(theme==='dark'){
  setTheme(theme);
}else{
  setTheme('light');
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
      <ThemeToggleBtn setTheme={setTheme}/>
    </AppProvider>
  </React.StrictMode>
);
