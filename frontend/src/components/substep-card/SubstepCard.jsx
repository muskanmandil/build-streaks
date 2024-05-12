import React, { useContext, useEffect, useState } from "react";
import QuestionCard from "../question-card/QuestionCard";
import "./SubstepCard.css";
import arrow_up from "../../assets/arrow_up.svg";
import arrow_down from "../../assets/arrow_down.svg";
import { ProgressContext } from "../../context/ProgressContext";

const SubstepCard = (props) => {
  const { progressInfo } = useContext(ProgressContext);
  const [isOpen, setIsOpen] = useState(false);
  const [questionsDoneInSubstep, setQuestionsDoneInSubstep] = useState(0);
  const updateQuestionsDoneInSubstep = () => {
    let count = 0;
    props.all_questions.forEach((question) => {
      if (progressInfo.questionsData[question.id] === 1) {
        count++;
      }
    });
    setQuestionsDoneInSubstep(count);
  };

  useEffect(() => {
    updateQuestionsDoneInSubstep();
  }, [progressInfo]);

  return (
    <div className="substep-card">
      <div className="substep-card-content">
        <p className="substep-heading">
          Step {props.id} : {props.substepTitle}
        </p>
        <div className="progress-bar">
          {questionsDoneInSubstep} / {props.all_questions.length}
        </div>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? <img src={arrow_down} /> : <img src={arrow_up} />}
        </button>
      </div>

      {isOpen ? (
        <div className="questions-list">
          {props.all_questions.map((question, index) => {
            return (
              <QuestionCard
                key={index}
                id={question.id}
                questionTitle={question.questionTitle}
                level={question.level}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default SubstepCard;
