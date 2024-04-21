import React from 'react'
import "./QuestionCard.css"

const QuestionCard = (props) => {
  return (
    <div className={`question-card ${props.level==="medium" ? "medium-level" : props.level==="hard" ? "hard-level" : "easy-level"}`}>
        <button>Check</button>
        <p className="question-title">{props.questionTitle}</p>
    </div>
  )
}

export default QuestionCard