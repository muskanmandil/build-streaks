import React, { createContext, useCallback, useEffect, useState } from "react";
import all_steps from "../roadmap";

export const ProgressContext = createContext();

const getDefaultQuestionsData = () => {
  let questionsObj = {};
  for (let i = 0; i < 455; i++) {
    questionsObj[i] = 0;
  }
  return questionsObj;
};

export const ProgressProvider = ({ children }) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const [progressInfo, setProgressInfo] = useState({
    questionsData: getDefaultQuestionsData(),
    streak: "",
    points: "",
    lastActiveDate: "",
  });

  const [totalQuestionsDone, setTotalQuestionsDone] = useState(0);

  const fetchProgressInfo = useCallback(async () => {
    if (localStorage.getItem("auth-token")) {
      try {
        const res = await fetch(`${backendUrl}/progressinfo`, {
          method: "POST",
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        // console.log(res);

        if (res.status === 200) {
          const data = await res.json();
          setProgressInfo((prevProgressInfo) => ({
            ...prevProgressInfo,
            ...data,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [backendUrl])

  useEffect(() => {
    fetchProgressInfo();
  }, [fetchProgressInfo])
  
  const markQuestionDone = (questionId, questionLevel) => {
    fetch(`${backendUrl}/questiondone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
      },
      body: JSON.stringify({
        questionId: questionId,
        questionLevel: questionLevel,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        setProgressInfo((prevProgressInfo) => ({
          ...prevProgressInfo,
          questionsData: { ...prevProgressInfo.questionsData, [questionId]: 1 },
          streak: data.streak,
          points: data.points,
          lastActiveDate: data.lastActiveDate,
        }))
      );
  };

  const markQuestionUndone = (questionId, questionLevel) => {
    fetch(`${backendUrl}/questionundo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
      },
      body: JSON.stringify({
        questionId: questionId,
        questionLevel: questionLevel,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        setProgressInfo((prevProgressInfo) => ({
          ...prevProgressInfo,
          questionsData: { ...prevProgressInfo.questionsData, [questionId]: 0 },
          points: data.points,
        }))
      );
  };

  const totalQuestionsInStep = (stepId) => {
    const step = all_steps.find((s) => s.id === stepId);
    const totalLength = step.all_substeps.reduce(
      (sum, substep) => sum + substep.all_questions.length,
      0
    );
    return totalLength;
  };

  const updateTotalQuestionsDone = useCallback(() => {
    let count = 0;
    all_steps.forEach((step) => {
      step.all_substeps.forEach((substep) => {
        substep.all_questions.forEach((question) => {
          if (progressInfo.questionsData[question.id] === 1) {
            count++;
          }
        });
      });
    });
    setTotalQuestionsDone(count);
  },[progressInfo.questionsData])

  useEffect(()=>{
    updateTotalQuestionsDone();
  },[updateTotalQuestionsDone])

  return (
    <ProgressContext.Provider
      value={{
        progressInfo,
        totalQuestionsDone,
        totalQuestionsInStep,
        markQuestionDone,
        markQuestionUndone
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
