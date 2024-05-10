import React, { useState } from "react";
import QuestionCard from "../question-card/QuestionCard";
import "./SubstepCard.css"
import arrow_up from "../../assets/arrow_up.svg"
import arrow_down from "../../assets/arrow_down.svg"

const SubstepCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="substep-card" >
      <div className="substep-card-content" >
        <p className="substep-heading">Step {props.id} : {props.substepTitle}</p>
        <div className="progress-bar">0 / {props.all_questions.length}</div>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>{!isOpen ? (<img src={arrow_down} />) : <img src={arrow_up} />}</button>
      </div>
      
      {isOpen ? (
        <div className="questions-list">
          {props.all_questions.map((question) => {
            return <QuestionCard questionTitle={question.questionTitle} level={question.level} />;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SubstepCard;
