import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import { AppContext } from "./context/AppContext";
import { ProgressProvider } from "./context/ProgressContext";
import Leaderboard from "./pages/Leaderboard";
import { useContext } from "react";
import Loading from "./components/loading/Loading";
import Notes from "./pages/Notes";

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
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
