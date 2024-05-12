import React, { useContext, useEffect} from "react";
import "./QuestionCard.css";
import youtube from "../../assets/youtube.svg";
import gfg from "../../assets/gfg.svg";
import leetcode from "../../assets/leetcode.svg";
import article_icon from "../../assets/article_icon.svg";
import { ProgressContext } from "../../context/ProgressContext";

const QuestionCard = (props) => {
  const { progressInfo, markQuestionDone, markQuestionUndone } = useContext(ProgressContext);

  useEffect(()=>{
  },[props.id, progressInfo]);

  const handleDone = async (questionId) => {
    if (progressInfo.questionsData[questionId]===1) {
      markQuestionUndone(questionId);
    } else {
      markQuestionDone(questionId);
    }
  };
  return (
    <div className={`question-card ${progressInfo.questionsData[props.id]===1 ? "question-completed" : null}`}>
      <div
        className={`check-btn ${progressInfo.questionsData[props.id]===1 ? "completed" : null}`}
        onClick={() => handleDone(props.id)}
      ></div>
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
      <a href="" className="lecture-link">
        <img src={youtube} alt="" />
      </a>
      <a href="" className="problem-link">
        <img src={gfg} alt="" />
      </a>
      <a href="" className="article-link">
        <img src={article_icon} alt="" />
      </a>
    </div>
  );
};

export default QuestionCard;
