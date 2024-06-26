import React, { useCallback, useContext, useEffect, useState } from "react";
import QuestionCard from "../question-card/QuestionCard";
import "./SubstepCard.css";
import arrow_up from "../../assets/arrow_up.svg";
import arrow_down from "../../assets/arrow_down.svg";
import { ProgressContext } from "../../context/ProgressContext";

const SubstepCard = (props) => {
  const { progressInfo } = useContext(ProgressContext);
  const [isOpen, setIsOpen] = useState(false);
  const [questionsDoneInSubstep, setQuestionsDoneInSubstep] = useState(0);
  const updateQuestionsDoneInSubstep = useCallback(() => {
    let count = 0;
    props.all_questions.forEach((question) => {
      if (progressInfo.questionsData[question.id] === 1) {
        count++;
      }
    });
    setQuestionsDoneInSubstep(count);
  },[props.all_questions, progressInfo.questionsData])

  useEffect(() => {
    updateQuestionsDoneInSubstep();
  }, [updateQuestionsDoneInSubstep]);

  const progress = (questionsDoneInSubstep / props.all_questions.length) * 100;

  return (
    <div className="substep-card">
      <div className="substep-card-content">
        <p className="substep-heading">
          <span>Step {props.id} :</span> {props.substepTitle}
        </p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <p className={`${progress >= 50 ? "half-substep-complete" : null}`}>
            {questionsDoneInSubstep} / {props.all_questions.length}
          </p>
        </div>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? (
            <img src={arrow_down} alt="arrow_icon" />
          ) : (
            <img src={arrow_up} alt="arrow_icon" />
          )}
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
                lecturelink={question.lecturelink}
                problemlink={question.problemlink}
                articlelink={question.articlelink}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default SubstepCard;
