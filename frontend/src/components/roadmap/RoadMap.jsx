import React, { useContext } from "react";
import "./RoadMap.css";
import all_steps from "../../roadmap";
import StepCard from "../step-card/StepCard";
import FilterBtn from "../filter-btn/FilterBtn";
import { AppContext } from "../../context/AppContext";

const RoadMap = () => {
  const {setFilter} = useContext(AppContext);
  return (
    <div className="roadmap">
      <div className="filters-div">
        <FilterBtn level="easy"/>
        <FilterBtn level="medium"/>
        <FilterBtn level="hard"/>
        <button id="reset" className="filter-btn" onClick={()=>setFilter("")}>Reset Filter</button>
      </div>
      <div className="roadmap-timeline">
        {all_steps.map((step, index) => {
          return (
            <StepCard
              key={index}
              id={step.id}
              title={step.title}
              color={step.color}
              all_substeps={step.all_substeps}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RoadMap;
