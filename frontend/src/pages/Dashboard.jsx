import React, { useContext } from "react";
import "./CSS/Dashboard.css";
import RoadMap from "../components/roadmap/RoadMap";
import { ProgressProvider } from "../context/ProgressContext";
import FilterBtn from "../components/filter-btn/FilterBtn";
import SecondaryBtn from "../components/secondary-btn/SecondaryBtn";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const { setFilter, revision, setRevision } = useContext(AppContext);

  const resetFilter = () => {
    setFilter("");
    setRevision(false);
  };

  return (
    <div className="dashboard">
      <ProgressProvider>
        <div className="top-bar">
          <div className="filters-div-left">
            <FilterBtn level="easy" />
            <FilterBtn level="medium" />
            <FilterBtn level="hard" />
          </div>
          <div className="filters-div-right">
            <SecondaryBtn
              className="show-hide-revision"
              text={revision ? "Hide Revision" : "Show Revision"}
              onClick={() => setRevision(!revision)}
            />
            <SecondaryBtn
              text="Reset"
              className="reset-btn"
              onClick={() => resetFilter()}
            />
          </div>
        </div>
        <RoadMap />
      </ProgressProvider>
    </div>
  );
};

export default Dashboard;
