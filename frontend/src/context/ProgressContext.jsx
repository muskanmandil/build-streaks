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
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [progressInfo, setProgressInfo] = useState({
    questionsData: getDefaultQuestionsData(),
    totalQuestionsDone: 0,
    streak: "",
    points: "",
    lastActiveDate: "",
  });

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
  }, [backendUrl]);

  useEffect(() => {
    fetchProgressInfo();
  },[fetchProgressInfo]);

  const markQuestionDone = async (questionId, questionLevel) => {
    // Update points
    let pointsToAdd = 0;
    if (questionLevel === "easy") pointsToAdd = 10;
    else if (questionLevel === "medium") pointsToAdd = 20;
    else pointsToAdd = 40;

    // for testing purpose of streak
    // let currentDate = new Date(2024, 4, 14).toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');

    // Update streak
    const currentDate = new Date()
      .toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
    let newStreak = progressInfo.streak;
    const daysDiff = calculateDaysDiff(
      progressInfo.lastActiveDate,
      currentDate
    );

    if ((daysDiff === 0 && newStreak === 0) || daysDiff > 1) {
      newStreak = 1;
    } else if (daysDiff === 1) {
      newStreak += 1;
    }

    // update progress info locally
    setProgressInfo((prevProgressInfo) => ({
      ...prevProgressInfo,
      questionsData: { ...prevProgressInfo.questionsData, [questionId]: 1 },
      totalQuestionsDone: prevProgressInfo.totalQuestionsDone + 1,
      streak: newStreak,
      points: prevProgressInfo.points + pointsToAdd,
      lastActiveDate: currentDate,
    }));

    // send progress info to backend
    try {
      const res = await fetch(`${backendUrl}/questiondone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({
          questionId: questionId,
          totalQuestionsDone: progressInfo.totalQuestionsDone + 1,
          streak: newStreak,
          points: progressInfo.points + pointsToAdd,
          lastActiveDate: currentDate,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error marking question as done:", error);
    }
  };

  // Function for calculating days diff
  const calculateDaysDiff = (date1, date2) => {
    // Parse the date strings into Date objects
    const d1 = new Date(
      `${date1.slice(6, 10)}-${date1.slice(3, 5)}-${date1.slice(0, 2)}`
    );
    const d2 = new Date(
      `${date2.slice(6, 10)}-${date2.slice(3, 5)}-${date2.slice(0, 2)}`
    );

    // Calculate the time difference in milliseconds
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());

    // Convert the time difference from milliseconds to days
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysDiff;
  };

  const markQuestionUndone = async (questionId, questionLevel) => {
    // Update points
    let pointsToSubtract = 0;
    if (questionLevel === "easy") pointsToSubtract = 10;
    else if (questionLevel === "medium") pointsToSubtract = 20;
    else pointsToSubtract = 40;

    // Update local state
    setProgressInfo((prevProgressInfo) => ({
      ...prevProgressInfo,
      questionsData: { ...prevProgressInfo.questionsData, [questionId]: 0 },
      totalQuestionsDone: prevProgressInfo.totalQuestionsDone - 1,
      points: prevProgressInfo.points - pointsToSubtract,
    }));

    try {
      const res = await fetch(`${backendUrl}/questionundo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({
          questionId: questionId,
          totalQuestionsDone: progressInfo.totalQuestionsDone - 1,
          points: progressInfo.points - pointsToSubtract,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error marking question as undone:", error);
    }
  };

  const levelQuestions = (level) => {
    if(level===""){
      return 455;
    }
    let levelQuestions = 0;
    all_steps.forEach((steps) => {
      steps.all_substeps.forEach(substeps=>{
        substeps.all_questions.forEach(questions=>{
          if(questions.level === level){
            levelQuestions++;
          }
        })
      })
    });
    return levelQuestions;
  };

  const levelQuestionsDone = (level) => {
    if(level===""){
      return progressInfo.totalQuestionsDone;
    }
    let levelQuestionsDone = 0;
    all_steps.forEach((steps) => {
      steps.all_substeps.forEach(substeps=>{
        substeps.all_questions.forEach(questions=>{
          if(questions.level === level && progressInfo.questionsData[questions.id]===1){
            levelQuestionsDone++;
          }
        })
      })
    });
    return levelQuestionsDone;
  };

  return (
    <ProgressContext.Provider
      value={{
        progressInfo,
        fetchProgressInfo,
        levelQuestions,
        levelQuestionsDone,
        markQuestionDone,
        markQuestionUndone,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
