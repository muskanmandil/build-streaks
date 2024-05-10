import "./App.css";
import all_steps from "./roadmap";
import StepCard from "./components/step-card/StepCard";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";


const App = () => {

  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app">
      <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

      {/* <h1>Welcome !</h1>
      <div className="steps-container">
        {all_steps.map((step) => {
          return (
            <StepCard id={step.id} title={step.title} color={step.color} all_substeps={step.all_substeps} />
          );
        })}
      </div> */}
    </div>
  );
};

export default App;
