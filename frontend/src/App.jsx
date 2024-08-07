import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { AppContext } from "./context/AppContext";
import { ProgressProvider } from "./context/ProgressContext";
import Leaderboard from "./pages/Leaderboard";
import { useContext } from "react";
import Loading from "./components/loading/Loading";

const App = () => {
  const { loading } = useContext(AppContext);

  return loading ? (
    <Loading />
  ) : (
    <div className="app">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
};

export default App;
