import React, { useContext, useState } from "react";
import "./NotesPanel.css";
import { ThemeContext } from "../../context/ThemeContext";
import { ProgressContext } from "../../context/ProgressContext";
import NoteCard from "../note-card/NoteCard";
import { AppContext } from "../../context/AppContext";

const NotesPanel = ({ notesFilter, setNotesFilter }) => {
  const {roadmap} = useContext(AppContext);
  const { progressInfo } = useContext(ProgressContext);
  const { theme } = useContext(ThemeContext);
  const [notePopupId, setNotePopupId] = useState(null);

  let SNo = 1;
  const title = () => {
    if (roadmap.find((step) => step.step_id === notesFilter)) {
      return `Step ${notesFilter}: ${roadmap[notesFilter - 1].title}`;
    } else {
      return "All Notes";
    }
  };

  const filteredNotes = roadmap.flatMap((step) => {
    if (notesFilter === 0 || step.step_id === notesFilter) {
      return step.all_substeps.flatMap((substep) =>
        substep.all_questions
          .filter(
            (question) =>
              progressInfo.questionsData[question.question_id].note.status === true
          )
          .map((question) => (
            <NoteCard
              key={question.question_id}
              sNo={SNo++}
              title={question.title}
              id={question.question_id}
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
