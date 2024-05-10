import "./App.css";
import all_steps from "./roadmap";
import StepCard from "./components/step-card/StepCard";
import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <AppProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
