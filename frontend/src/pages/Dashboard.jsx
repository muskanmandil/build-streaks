import React from "react";
import "./CSS/Dashboard.css";
import RoadMap from "../components/roadmap/RoadMap";
import { ProgressProvider } from "../context/ProgressContext";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <ProgressProvider>
        <RoadMap/>
        {/* <RoadmapStats />*/}
      </ProgressProvider>
    </div>
  );
};

export default Dashboard;
