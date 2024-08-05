import React, {useContext} from "react";
import "./CSS/Dashboard.css";
import RoadMap from "../components/roadmap/RoadMap";
import { ProgressProvider } from "../context/ProgressContext";
import FilterBtn from "../components/filter-btn/FilterBtn";
import PrimaryBtn from "../components/primary-btn/PrimaryBtn";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const {setFilter,revision,setRevision} = useContext(AppContext);
  return (
    <div className="dashboard">
      <ProgressProvider>
        <div className="top-bar">
          <div className="filters-div-left">
            <FilterBtn level="easy"/>
            <FilterBtn level="medium"/>
            <FilterBtn level="hard"/>
          </div>
          <div className="filters-div-right">
            <PrimaryBtn className="show-hide-revision" text={revision ? "Hide Revision" : "Show Revision"} onClick={()=>setRevision(!revision)}/>
            <PrimaryBtn text="Reset" className="reset-btn" onClick={()=>{setFilter(""); setRevision(false)}} />          </div>
        </div>
        <RoadMap/>
      </ProgressProvider>
    </div>
  );
};

export default Dashboard;
