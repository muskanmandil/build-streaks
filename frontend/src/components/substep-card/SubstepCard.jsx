import React, { useCallback, useContext, useEffect, useState } from "react";
import QuestionCard from "../question-card/QuestionCard";
import "./SubstepCard.css";
import arrow_up from "../../assets/arrow_up.svg";
import arrow_down from "../../assets/arrow_down.svg";
import { ProgressContext } from "../../context/ProgressContext";
import { AppContext } from "../../context/AppContext";

const SubstepCard = (props) => {
  const { filter, revision } = useContext(AppContext);
  const { progressInfo } = useContext(ProgressContext);
  const [isOpen, setIsOpen] = useState(false);
  const [questionsDoneInSubstep, setQuestionsDoneInSubstep] = useState(0);

  // to update questions done in substep
  const updateQuestionsDoneInSubstep = useCallback(() => {
    let count = 0;
    props.all_questions.forEach((question) => {
      if (
        (revision ? progressInfo.questionsData[question.question_id].revision : true) &&
        progressInfo.questionsData[question.question_id].completed &&
        (question.level === filter || filter === "")
      ) {
        count++;
      }
    });
    setQuestionsDoneInSubstep(count);
  }, [props.all_questions, progressInfo.questionsData, filter, revision]);

  // to keep rendering updated questions done in substep
  useEffect(() => {
    updateQuestionsDoneInSubstep();
  }, [updateQuestionsDoneInSubstep]);

  // to filter questions in the substep
  const filteredQuestionsInSubstep = () => {
    let length = 0;
    props.all_questions.forEach((question) => {
      if (
        (revision ? progressInfo.questionsData[question.question_id].revision : true) &&
        (filter === "" || question.level === filter)
      ) {
        length++;
      }
    });
    return length;
  };

  // progress variable
  const progress =
    (questionsDoneInSubstep / filteredQuestionsInSubstep()) * 100;

  // filter check
  return (
    filteredQuestionsInSubstep() !== 0 && (
      <div className="substep-card">
        <div className="substep-card-content">
          <p className="substep-heading">
            <span>Step {props.id} :</span> {props.title}
          </p>

          {/* progress-bar */}
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
            <p className={`${progress >= 50 ? "half-substep-complete" : null}`}>
              {questionsDoneInSubstep} / {filteredQuestionsInSubstep()}
            </p>
          </div>

          {/* toggle-btn */}
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? (
              <img src={arrow_down} alt="arrow_icon" />
            ) : (
              <img src={arrow_up} alt="arrow_icon" />
            )}
          </button>
        </div>

        {/* toggle-btn check */}
        {isOpen ? (
          <div className="questions-list">
            {props.all_questions.map((question, index) => {
              return (
                <QuestionCard
                  key={index}
                  id={question.question_id}
                  title={question.title}
                  level={question.level}
                  lecture_link={question.lecture_link}
                  problem_link={question.problem_link}
                  article_link={question.article_link}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    )
  );
};

export default SubstepCard;
