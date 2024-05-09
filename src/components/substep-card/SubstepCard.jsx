import React, { useState } from "react";
import QuestionCard from "../question-card/QuestionCard";
import "./SubstepCard.css"

const SubstepCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="substep-card">
      <div className="substep-card-content" >
        <p className="substep-heading">Step {props.id} : {props.substepTitle}</p>
        <div className="progress-bar">Total : {props.all_questions.length}</div>
        <button onClick={() => setIsOpen(!isOpen)}>{!isOpen ? "v" : "^"}</button>
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
