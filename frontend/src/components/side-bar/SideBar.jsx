import React from "react";
import "./SideBar.css";
import StepCardSidebar from "../step-card-sidebar/StepCardSideBar";
import all_steps from "../../roadmap";

const SideBar = ({notesFilter, setNotesFilter}) => {
  return (
    <div className="sidebar">
      {all_steps.map((step, idx) => {
        return <StepCardSidebar key={idx} title={step.title} id={step.id} notesFilter={notesFilter} setNotesFilter={setNotesFilter}/>;
      })}
    </div>
  );
};

export default SideBar;
