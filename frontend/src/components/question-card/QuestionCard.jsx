import React, { useContext, useEffect, useState } from "react";
import "./QuestionCard.css";
import youtube from "../../assets/youtube.svg";
import gfg from "../../assets/gfg.svg";
import leetcode from "../../assets/leetcode.svg";
import codestudio from "../../assets/codestudio.png";
import { ProgressContext } from "../../context/ProgressContext";
import interviewbit from "../../assets/interviewbit.svg";
import spoj from "../../assets/spoj.jpg";
import tuf_circle from "../../assets/tuf_circle.svg";
import NotePopup from "../note-popup/NotePopup";
import { AppContext } from "../../context/AppContext";

const QuestionCard = (props) => {
  const { filter, revision } = useContext(AppContext);
  const {
    progressInfo,
    markQuestionDone,
    markQuestionUndone,
    addToRevision,
    removeFromRevision,
  } = useContext(ProgressContext);

  const [notePopup, setNotePopup] = useState(false);

  // to render the updated question card again
  useEffect(() => {}, [props.id, progressInfo]);

  // handling question done state on frontend
  const handleDone = async (questionId, questionLevel) => {
    if (progressInfo.questionsData[questionId].completed) {
      markQuestionUndone(questionId, questionLevel);
    } else {
      markQuestionDone(questionId, questionLevel);
    }
  };

  const handleRevision = async (questionId) => {
    if (progressInfo.questionsData[questionId].revision) {
      removeFromRevision(questionId);
    } else {
      addToRevision(questionId);
    }
  };

  // domain check for correct problem platform icon
  let domain = "";
  if (props.problem_link !== "") {
    domain = new URL(props.problem_link).hostname;
  }

  return (
    // filter check
    (revision ? progressInfo.questionsData[props.id].revision : true) &&
    (filter === props.level || filter === "") && (
      <>
        <div
          className={`question-card ${
            progressInfo.questionsData[props.id].completed &&
            "question-completed"
          }`}
        >
          {/*tick button  */}
          <div
            className={`check-btn ${
              progressInfo.questionsData[props.id].completed && "completed"
            }`}
            onClick={() => handleDone(props.id, props.level)}
          ></div>
          <p className="question-title">{props.title}</p>
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
            href={props.lecture_link}
            className="lecture-link"
            target="_blank"
            rel="noreferrer"
          >
            <img src={props.lecture_link !== "" ? youtube : null} alt="" />
          </a>

          <a
            href={props.problem_link}
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
            href={props.article_link}
            className="article-link"
            target="_blank"
            rel="noreferrer"
          >
            <img src={props.article_link !== "" ? tuf_circle : null} alt="" />
          </a>

          {/*add to revision button  */}
          <div
            className={`revision-btn ${
              progressInfo.questionsData[props.id].revision && "revision"
            }`}
            onClick={() => handleRevision(props.id)}
          ></div>

          {/*add note button  */}
          <div
            className={`note-btn ${
              progressInfo.questionsData[props.id].note.status && "note"
            }`}
            onClick={() => setNotePopup(true)}
          ></div>
        </div>
        <NotePopup
          questionId={props.id}
          questionTitle={props.title}
          className={!notePopup && "hide-note"}
          onClose={() => setNotePopup(false)}
        />
      </>
    )
  );
};

export default QuestionCard;
