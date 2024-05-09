import React from "react";
import "./CSS/Dashboard.css";
import Navbar from "../components/navbar/Navbar";
import RoadMap from "../components/roadmap/RoadMap";
import RoadmapStats from "../components/roadmap-stats/RoadmapStats";
import LeaderboardCard from "../components/leaderboard-card/LeaderboardCard";

const Dashboard = () => {
  return (
      <div className="dashboard">
        <RoadMap />
        {/* <RoadmapStats />
        <LeaderboardCard /> */}
      </div>
  );
};

export default Dashboard;
