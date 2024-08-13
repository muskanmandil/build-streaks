import React, { useContext, useState } from "react";
import "./NotesPanel.css";
import { ThemeContext } from "../../context/ThemeContext";
import { ProgressContext } from "../../context/ProgressContext";
import all_steps from "../../roadmap";
import NoteCard from "../note-card/NoteCard";

const NotesPanel = ({ notesFilter, setNotesFilter }) => {
  const { progressInfo } = useContext(ProgressContext);
  const { theme } = useContext(ThemeContext);
  const [notePopupId, setNotePopupId] = useState(null);

  let SNo = 1;
  const title = () => {
    if (all_steps.find((step) => step.id === notesFilter)) {
      return `Step ${notesFilter}: ${all_steps[notesFilter - 1].title}`;
    } else {
      return "All Notes";
    }
  };

  const filteredNotes = all_steps.flatMap((step) => {
    if (notesFilter === 0 || step.id === notesFilter) {
      return step.all_substeps.flatMap((substep) =>
        substep.all_questions
          .filter(
            (question) =>
              progressInfo.questionsData[question.id].note.status === true
          )
          .map((question) => (
            <NoteCard
              key={question.id}
              sNo={SNo++}
              title={question.questionTitle}
              id={question.id}
              notePopupId={notePopupId}
              setNotePopupId={setNotePopupId}
            />
          ))
      );
    }
    return [];
  });

  return (
    <div className="notes-panel">
      <div className="notes-panel-header">
        <h2
          className={`notes-panel-heading ${theme === "light" && "light-mode"}`}
        >
          {title()}
        </h2>
        {notesFilter !== 0 && (
          <p className="all-notes" onClick={() => setNotesFilter(0)}>
            Go to All Notes
          </p>
        )}
      </div>

      {filteredNotes.length !== 0 ? (
        <div className="table">
          <div className="table-header">
            <p className="table-cell s-no">S.No.</p>
            <p className="table-cell question">Question</p>
            <p className="table-cell">Note</p>
          </div>
          <div className="table-body">{filteredNotes}</div>
        </div>
      ) : (
        <h4>No notes found</h4>
      )}
    </div>
  );
};

export default NotesPanel;
