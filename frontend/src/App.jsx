import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { AppProvider } from "./context/AppContext";
import { ProgressProvider } from "./context/ProgressContext";
import Leaderboard from "./pages/Leaderboard";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <AppProvider>
          <ProgressProvider>
            <Navbar />
          </ProgressProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
