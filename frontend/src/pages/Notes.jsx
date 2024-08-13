import React, { useState } from "react";
import "./CSS/Notes.css";
import SideBar from "../components/side-bar/SideBar";
import NotesPanel from "../components/notes-panel/NotesPanel";
import { ProgressProvider } from "../context/ProgressContext";

const Notes = () => {
  const [notesFilter, setNotesFilter] = useState(0);
  return (
    <div className="notes-page">
      <SideBar notesFilter={notesFilter} setNotesFilter={setNotesFilter} />
      <ProgressProvider>
        <NotesPanel notesFilter={notesFilter} setNotesFilter={setNotesFilter} />
      </ProgressProvider>
    </div>
  );
};

export default Notes;
