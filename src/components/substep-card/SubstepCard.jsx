import React, { useState } from "react";
import QuestionCard from "../question-card/QuestionCard";
import "./SubstepCard.css"

const SubstepCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`substep-card ${props.level==="medium" ? "medium-level" : props.level==="hard" ? "hard-level" : ""}`}>
      <div className="substep-card-content" >
        <p className="substep-heading">Substep {props.id} : {props.substepTitle}</p>
        <div className="progress-bar">Total : {props.all_questions.length}</div>
        <button onClick={() => setIsOpen(!isOpen)}>Toggle questions</button>
      </div>
      
      {isOpen ? (
        <div className="questions-list">
          {props.all_questions.map((question) => {
            return <QuestionCard questionTitle={question.questionTitle} />;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SubstepCard;
