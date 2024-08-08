import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from "./context/AppContext";
import ThemeToggleBtn from './components/theme-toggle-btn/ThemeToggleBtn';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <AppProvider>
      <ThemeProvider>
        <App />
        <ThemeToggleBtn />
      </ThemeProvider>
    </AppProvider>

  </React.StrictMode>
);