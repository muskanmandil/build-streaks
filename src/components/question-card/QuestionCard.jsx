import React, { useState } from "react";
import "./QuestionCard.css";
import youtube from "../../assets/youtube.svg";
import gfg from "../../assets/gfg.svg";
import leetcode from "../../assets/leetcode.svg";
import article_icon from "../../assets/article_icon.svg"

const QuestionCard = (props) => {
  const [isDone, setDone] = useState(false);
  return (
    <div className={`question-card ${isDone ? "question-completed": null}`}>
      <div className={`check-btn ${isDone ? "completed" : null}`} onClick={()=>setDone(!isDone)}></div>
      <p className="question-title  ">{props.questionTitle}</p>
      <p
        className={`question-level ${
          props.level === "medium"
            ? "medium-level"
            : props.level === "hard"
            ? "hard-level"
            : "easy-level"
        }`}
      >
        {props.level}
      </p>
      <a href="" className="lecture-link"><img src={youtube} alt="" /></a>
      <a href="" className="problem-link"><img src={gfg} alt="" /></a>
      <a href="" className="article-link"><img src={article_icon} alt="" /></a>
    </div>
  );
};

export default QuestionCard;
