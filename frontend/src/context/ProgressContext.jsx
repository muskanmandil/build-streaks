import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";

export const ProgressContext = createContext();

const getDefaultQuestionsData = () => {
  let questionsObj = {};
  for (let i = 0; i < 455; i++) {
    questionsObj[i] = {
      completed: false,
      revision: false,
      note: {
        status: false,
        content: "",
      },
    };
  }
  return questionsObj;
};

export const ProgressProvider = ({ children }) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [progressInfo, setProgressInfo] = useState({
    questionsData: getDefaultQuestionsData(),
    streak: "",
    points: "",
    lastActiveDate: "",
    activityData: [],
  });

  const fetchProgressInfo = useCallback(async () => {
    if (localStorage.getItem("auth-token")) {
      try {
        const res = await fetch(`${backendUrl}/user/progress`, {
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

  // to fetch the progress info on the first-render of the app
  useEffect(() => {
    fetchProgressInfo();
  }, [fetchProgressInfo]);

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

    let latestActivityData = progressInfo.activityData;
    if (!latestActivityData.includes(currentDate)) {
      latestActivityData.push(currentDate);
    }

    // update progress info locally
    setProgressInfo((prevProgressInfo) => ({
      ...prevProgressInfo,
      questionsData: {
        ...prevProgressInfo.questionsData,
        [questionId]: {
          ...prevProgressInfo.questionsData[questionId],
          completed: true,
        },
      },
      streak: newStreak,
      points: prevProgressInfo.points + pointsToAdd,
      lastActiveDate: currentDate,
      activityData: latestActivityData,
    }));

    // send progress info to backend
    try {
      const res = await fetch(`${backendUrl}/question/done`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({
          questionId: questionId,
          streak: newStreak,
          points: progressInfo.points + pointsToAdd,
          lastActiveDate: currentDate,
          activityData: latestActivityData,
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

    // Update progress info local state
    setProgressInfo((prevProgressInfo) => ({
      ...prevProgressInfo,
      questionsData: {
        ...prevProgressInfo.questionsData,
        [questionId]: {
          ...prevProgressInfo.questionsData[questionId],
          completed: false,
        },
      },
      points: prevProgressInfo.points - pointsToSubtract,
    }));

    // send updates progress info data to backend
    try {
      const res = await fetch(`${backendUrl}/question/undo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({
          questionId: questionId,
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

  const addToRevision = async (questionId) => {
    // update progress info locally
    setProgressInfo((prevProgressInfo) => ({
      ...prevProgressInfo,
      questionsData: {
        ...prevProgressInfo.questionsData,
        [questionId]: {
          ...prevProgressInfo.questionsData[questionId],
          revision: true,
        },
      },
    }));

    // send progress info to backend
    try {
      const res = await fetch(`${backendUrl}/question/add-to-revision`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({
          questionId: questionId,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error adding question to revision:", error);
    }
  };

  const removeFromRevision = async (questionId) => {
    // Update progress info local state
    setProgressInfo((prevProgressInfo) => ({
      ...prevProgressInfo,
      questionsData: {
        ...prevProgressInfo.questionsData,
        [questionId]: {
          ...prevProgressInfo.questionsData[questionId],
          revision: false,
        },
      },
    }));

    // send updates progress info data to backend
    try {
      const res = await fetch(`${backendUrl}/question/remove-from-revision`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({
          questionId: questionId,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error while removing question form revision:", error);
    }
  };

  const addNote = async (questionId, content) => {
    if (content === null) {
      return;
    }

    // update progress info locally
    setProgressInfo((prevProgressInfo) => ({
      ...prevProgressInfo,
      questionsData: {
        ...prevProgressInfo.questionsData,
        [questionId]: {
          ...prevProgressInfo.questionsData[questionId],
          note: { status: true, content: content },
        },
      },
    }));

    // send progress info to backend
    try {
      const res = await fetch(`${backendUrl}/question/add-note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({
          questionId: questionId,
          content: content,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (questionId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this note?"
    );
    
    if (confirmation) {
      // Update progress info local state
      setProgressInfo((prevProgressInfo) => ({
        ...prevProgressInfo,
        questionsData: {
          ...prevProgressInfo.questionsData,
          [questionId]: {
            ...prevProgressInfo.questionsData[questionId],
            note: { status: false, content: "" },
          },
        },
      }));

      // send updates progress info data to backend
      try {
        const res = await fetch(`${backendUrl}/question/delete-note`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
          body: JSON.stringify({
            questionId: questionId,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
        }
      } catch (error) {
        console.error("Error while removing note from question:", error);
      }
    }
  };

  // filtering all questions
  const {roadmap} = useContext(AppContext);
  const filteredQuestions = (level, revision) => {
    let filteredQuestions = 0;
    roadmap.forEach((step) => {
      step.all_substeps.forEach((substep) => {
        substep.all_questions.forEach((question) => {
          if (
            (revision
              ? progressInfo.questionsData[question.question_id].revision
              : true) &&
            (level === "" || question.level === level)
          ) {
            filteredQuestions++;
          }
        });
      });
    });
    return filteredQuestions;
  };

  // filtering questions done
  const filteredQuestionsDone = (level, revision) => {
    let filteredQuestionsDone = 0;
    roadmap.forEach((step) => {
      step.all_substeps.forEach((substep) => {
        substep.all_questions.forEach((question) => {
          if (
            (revision
              ? progressInfo.questionsData[question.question_id].revision
              : true) &&
            (level === "" || question.level === level) &&
            progressInfo.questionsData[question.question_id].completed
          ) {
            filteredQuestionsDone++;
          }
        });
      });
    });
    return filteredQuestionsDone;
  };

  return (
    <ProgressContext.Provider
      value={{
        progressInfo,
        fetchProgressInfo,
        filteredQuestions,
        filteredQuestionsDone,
        markQuestionDone,
        markQuestionUndone,
        addToRevision,
        removeFromRevision,
        addNote,
        deleteNote,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
