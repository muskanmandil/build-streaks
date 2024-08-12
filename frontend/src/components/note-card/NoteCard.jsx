import React from "react";
import "./NoteCard.css"
import NotePopup from "../note-popup/NotePopup";
const NoteCard = (props) => {
  return (
    <>
      <div className="note-card">
        <p className="table-cell s-no">{props.sNo}</p>
        <p className="table-cell question">{props.title}</p>
        <p className="table-cell view-note" onClick={() => props.setNotePopupId(props.id)}>
          View Note
        </p>
      </div>
      <NotePopup
        questionId={props.id}
        questionTitle={props.title}
        className={props.notePopupId !== props.id && "hide-note"}
        onClose={() => props.setNotePopupId(null)}
      />
    </>
  );
};

export default NoteCard;
