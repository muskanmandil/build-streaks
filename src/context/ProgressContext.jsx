import React, { createContext, useState } from "react";
import all_steps from "../roadmap";

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const totalQuestionsInStep = (stepId) => {
    const step = all_steps.find((s) => s.id === stepId);
    const totalLength = step.all_substeps.reduce(
      (sum, substep) => sum + substep.all_questions.length,
      0
    );
    return totalLength;
  };
  return (
    <ProgressContext.Provider value={{ totalQuestionsInStep }}>
      {children}
    </ProgressContext.Provider>
  );
};
