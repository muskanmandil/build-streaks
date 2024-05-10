import React, { useContext, useState } from "react";
import "./StepCard.css";
import SubstepCard from "../substep-card/SubstepCard";
import { ProgressContext } from "../../context/ProgressContext";

const StepCard = (props) => {
  const { totalQuestionsInStep } = useContext(ProgressContext);
  const [questionsDoneInStep, setQuestionsDoneInStep] = useState(0);
  const updateQuestionsDoneInStep = (increment) => {
    setQuestionsDoneInStep(questionsDoneInStep + increment);
  };

  return (
    <div className="step-card">
      <div className="card-header">
        <h3 className="card-heading">{props.title}</h3>
        <div className="progress">
          {questionsDoneInStep} / {totalQuestionsInStep(props.id)}
        </div>
      </div>
      <div className="progress-circle">
        <div className="card-number-logo">{props.id}</div>
      </div>
      <div className="substeps-list">
        {props.all_substeps.map((substep, index) => {
          return (
            <SubstepCard
              key={index}
              id={substep.id}
              substepTitle={substep.substepTitle}
              all_questions={substep.all_questions}
              updateQuestionsDoneInStep={updateQuestionsDoneInStep}
            />
          );
        })}
      </div>
      {/* <button onClick={() => setIsOpen(!isOpen)}> {!isOpen ? "v" : "^"}</button> */}
    </div>
  );
};

export default StepCard;
