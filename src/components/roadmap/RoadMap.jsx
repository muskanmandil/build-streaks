import React from "react";
import "./RoadMap.css";
import all_steps from "../../roadmap";
import StepCard from "../step-card/StepCard";

const RoadMap = () => {
  return (
    <div className="roadmap">
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
