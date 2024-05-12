import React, { useContext, useEffect, useState } from "react";
import "./StepCard.css";
import SubstepCard from "../substep-card/SubstepCard";
import { ProgressContext } from "../../context/ProgressContext";

const StepCard = (props) => {
  const { totalQuestionsInStep, progressInfo } = useContext(ProgressContext);

  const [questionsDoneInStep, setQuestionsDoneInStep] = useState(0);
  const updateQuestionsDoneInStep = () => {
    let count = 0;
    props.all_substeps.forEach((substep) => {
      substep.all_questions.forEach((question) => {
        if (progressInfo.questionsData[question.id] === 1) {
          count++;
        }
      });
    });
    setQuestionsDoneInStep(count);
  };

  useEffect(() => {
    updateQuestionsDoneInStep();
  }, [progressInfo]);

  const progress = (questionsDoneInStep / totalQuestionsInStep(props.id)) * 100;

  return (
    <div className="step-card">
      <div className="card-header">
        <h3 className="card-heading">{props.title}</h3>
        <div className="progress">
          {questionsDoneInStep} / {totalQuestionsInStep(props.id)}
        </div>
      </div>
      <div className="progress-outer-circle">
        {/* <div
          className="progress-inner-circle"
          style={{
            borderImage: `linear-gradient(to right, var(--gray), var(--semantic-green)) ${progress}%`,
          }}
        > */}
        <div className="card-number">
          {props.id}
          {/* </div> */}
        </div>
      </div>
      <div className="substeps-list">
        {props.all_substeps.map((substep, index) => {
          return (
            <SubstepCard
              key={index}
              id={substep.id}
              substepTitle={substep.substepTitle}
              all_questions={substep.all_questions}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StepCard;
