import React from "react";
import "./CSS/Dashboard.css";
import Navbar from "../components/navbar/Navbar";
import RoadMap from "../components/roadmap/RoadMap";
import RoadmapStats from "../components/roadmap-stats/RoadmapStats";
import LeaderboardCard from "../components/leaderboard-card/LeaderboardCard";
import { ProgressProvider } from "../context/ProgressContext";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <ProgressProvider>
        <RoadMap />
        {/* <RoadmapStats />
        <LeaderboardCard /> */}
      </ProgressProvider>
    </div>
  );
};

export default Dashboard;
