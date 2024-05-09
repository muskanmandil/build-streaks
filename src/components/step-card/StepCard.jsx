import React, { useState } from "react";
import all_steps from "../../roadmap";
import "./StepCard.css";
import SubstepCard from "../substep-card/SubstepCard";

const StepCard = (props) => {
  // const [isOpen, setIsOpen] = useState(false);
  const totalQuestions = (stepId) => {
    const step = all_steps.find((s) => s.id === stepId);
    const totalLength = step.all_substeps.reduce(
      (sum, substep) => sum + substep.all_questions.length,
      0
    );
    return totalLength;
  };
  return (
    <div className="step-card">
      <div className="card-header">
        <h3 className="card-heading">{props.title}</h3>
        <div className="progress">Total : {totalQuestions(props.id)}</div>
      </div>
      <div className="progress-circle">
        <div className="card-number-logo">{props.id}</div>
      </div>
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
      {/* <button onClick={() => setIsOpen(!isOpen)}> {!isOpen ? "v" : "^"}</button> */}
    </div>
  );
};

export default StepCard;
