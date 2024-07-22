import React, {useContext} from "react";
import "./CSS/Dashboard.css";
import RoadMap from "../components/roadmap/RoadMap";
import { ProgressProvider } from "../context/ProgressContext";
import FilterBtn from "../components/filter-btn/FilterBtn";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const {setFilter} = useContext(AppContext);
  return (
    <div className="dashboard">
      <ProgressProvider>
      <div className="filters-div">
        <FilterBtn level="easy"/>
        <FilterBtn level="medium"/>
        <FilterBtn level="hard"/>
        <button id="reset" className="filter-btn" onClick={()=>setFilter("")}>Reset Filter</button>
      </div>
        <RoadMap/>
        {/* <RoadmapStats />*/}
      </ProgressProvider>
    </div>
  );
};

export default Dashboard;
