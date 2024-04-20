import React, { useState } from "react";
import "./StepCard.css";
import SubstepCard from "../substep-card/SubstepCard";

const StepCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="step-card">
      <div className="card-img" style={{ backgroundColor: props.color }}></div>
      <div className="card-content">
      <div className="card-header">
        <p className="step-number">Step {props.id}</p>
        <p className="card-heading">{props.title}</p>
        <div className="progress-bar"></div>
        <button onClick={() => setIsOpen(!isOpen)}>Toggle substeps</button>
      </div>
      {isOpen ? (
        <div className="substeps-list">
          {props.all_substeps.map((substep) => {
            return (
              <SubstepCard
                id={substep.id}
                substepTitle={substep.substepTitle}
                all_questions={substep.all_questions}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}</div>
    </div>
  );
};

export default StepCard;
