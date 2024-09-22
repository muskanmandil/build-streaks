import React, {useContext} from "react";
import "./RoadMap.css";
import StepCard from "../step-card/StepCard";
import { AppContext } from "../../context/AppContext";

const RoadMap = () => {
  const {roadmap} = useContext(AppContext);

  return (
    <div className="roadmap">
      <div className="roadmap-timeline">
        {roadmap.map((step, index) => {
          return (
            <StepCard
              key={index}
              id={step.step_id}
              title={step.title}
              all_substeps={step.all_substeps}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RoadMap;
