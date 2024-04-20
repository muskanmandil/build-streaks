import React from 'react'
import "./QuestionCard.css"

const QuestionCard = (props) => {
  return (
    <div className='question-card'>
        <button>Check</button>
        <p className="question-title">{props.questionTitle}</p>
    </div>
  )
}

export default QuestionCard