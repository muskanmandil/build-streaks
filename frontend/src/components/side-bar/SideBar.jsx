import React, { useContext } from "react";
import "./SideBar.css";
import StepCardSidebar from "../step-card-sidebar/StepCardSideBar";
import {AppContext} from "../../context/AppContext";

const SideBar = ({notesFilter, setNotesFilter}) => {
  const {roadmap} = useContext(AppContext);
  return (
    <div className="sidebar">
      {roadmap.map((step, idx) => {
        return <StepCardSidebar key={idx} title={step.title} id={step.step_id} notesFilter={notesFilter} setNotesFilter={setNotesFilter}/>;
      })}
    </div>
  );
};

export default SideBar;
