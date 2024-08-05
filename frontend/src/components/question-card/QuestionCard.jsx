import React, { useContext, useEffect } from "react";
import "./QuestionCard.css";
import youtube from "../../assets/youtube.svg";
import gfg from "../../assets/gfg.svg";
import leetcode from "../../assets/leetcode.svg";
import codestudio from "../../assets/codestudio.png";
import { ProgressContext } from "../../context/ProgressContext";
import interviewbit from "../../assets/interviewbit.svg";
import spoj from "../../assets/spoj.jpg";
import tuf_circle from "../../assets/tuf_circle.svg";
import { AppContext } from "../../context/AppContext";

const QuestionCard = (props) => {
  const { filter } = useContext(AppContext);
  const {
    progressInfo,
    markQuestionDone,
    markQuestionUndone,
    addToRevision,
    removeFromRevision,
  } = useContext(ProgressContext);

  // to render the updated question card again
  useEffect(() => {}, [props.id, progressInfo]);

  // handling question done state on frontend
  const handleDone = async (questionId, questionLevel) => {
    if (progressInfo.questionsData[questionId].completionStatus === 1) {
      markQuestionUndone(questionId, questionLevel);
    } else {
      markQuestionDone(questionId, questionLevel);
    }
  };

  const handleRevision = async (questionId) => {
    if (progressInfo.questionsData[questionId].revisionStatus === 1) {
      removeFromRevision(questionId);
    } else {
      addToRevision(questionId);
    }
  };

  // domain check for correct problem platform icon
  let domain = "";
  if (props.problemlink !== "") {
    domain = new URL(props.problemlink).hostname;
  }

  return (
    // filter check
    (filter === props.level || filter === "") && (
      <div
        className={`question-card ${
          progressInfo.questionsData[props.id].completionStatus === 1 &&
          "question-completed"
        }`}
      >
        {/*tick button  */}
        <div
          className={`check-btn ${
            progressInfo.questionsData[props.id].completionStatus === 1 &&
            "completed"
          }`}
          onClick={() => handleDone(props.id, props.level)}
        ></div>
        <p className="question-title">{props.questionTitle}</p>
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

        <a
          href={props.lecturelink}
          className="lecture-link"
          target="_blank"
          rel="noreferrer"
        >
          <img src={props.lecturelink !== "" ? youtube : null} alt="" />
        </a>

        <a
          href={props.problemlink}
          className="problem-link"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={
              domain === "www.geeksforgeeks.org"
                ? gfg
                : domain === "leetcode.com"
                ? leetcode
                : domain === "www.naukri.com"
                ? codestudio
                : domain === "www.interviewbit.com"
                ? interviewbit
                : domain === "www.spoj.com"
                ? spoj
                : ""
            }
            alt=""
          />
        </a>

        <a
          href={props.articlelink}
          className="article-link"
          target="_blank"
          rel="noreferrer"
        >
          <img src={props.articlelink !== "" ? tuf_circle : null} alt="" />
        </a>

        {/*add to revision button  */}
        <div
          className={`revision-btn ${
            progressInfo.questionsData[props.id].revisionStatus === 1 &&
            "revision"
          }`}
          onClick={() => handleRevision(props.id)}
        ></div>
      </div>
    )
  );
};

export default QuestionCard;
