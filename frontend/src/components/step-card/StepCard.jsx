import React, { useCallback, useContext, useEffect, useState } from "react";
import "./StepCard.css";
import SubstepCard from "../substep-card/SubstepCard";
import { ProgressContext } from "../../context/ProgressContext";
import { AppContext } from "../../context/AppContext";

const StepCard = (props) => {
  const { filter } = useContext(AppContext);
  const { progressInfo } = useContext(ProgressContext);

  const [questionsDoneInStep, setQuestionsDoneInStep] = useState(0);
  const updateQuestionsDoneInStep = useCallback(() => {
    let count = 0;
    props.all_substeps.forEach((substep) => {
      substep.all_questions.forEach((question) => {
        if (
          progressInfo.questionsData[question.id] === 1 &&
          (question.level === filter || filter === "")
        ) {
          count++;
        }
      });
    });
    setQuestionsDoneInStep(count);
  }, [props.all_substeps, progressInfo.questionsData, filter]);

  useEffect(() => {
    updateQuestionsDoneInStep();
  }, [updateQuestionsDoneInStep]);

  const filteredQuestionsInStep = () => {
    let length = 0;
    props.all_substeps.forEach((substep) => {
      substep.all_questions.forEach((question) => {
        if (filter === "" || question.level === filter) {
          length++;
        }
      });
    });
    return length;
  };

  const progress = (questionsDoneInStep / filteredQuestionsInStep()) * 100;

  return (
    <div className="step-card">
      <div className="card-header">
        <h3 className="card-heading">{props.title}</h3>
        <div className="progress">
          {questionsDoneInStep} / {filteredQuestionsInStep()}
        </div>
        <div className="step-progress-bar-container">
          <div
            className="step-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div
        className={`card-number-outer-circle ${
          progress === 100 ? "step-complete" : null
        }`}
      >
        <div className="card-number">{props.id}</div>
      </div>
      {filteredQuestionsInStep() !== 0 ? (
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
      ) : (
        <p className="substeps-list">No questions at this level</p>
      )}
    </div>
  );
};

export default StepCard;
