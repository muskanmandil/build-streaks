import React, { useContext, useState } from "react";
import "./NotePopup.css";
import SecondaryBtn from "../secondary-btn/SecondaryBtn";
import delete_icon from "../../assets/delete.svg";
import { ProgressContext } from "../../context/ProgressContext";

const NotePopup = (props) => {
  const { progressInfo, addNote, deleteNote } = useContext(ProgressContext);
  const [editMode, setEditMode] = useState(
    !progressInfo.questionsData[props.questionId].note.status
  );
  const [noteContent, setNoteContent] = useState();

  const handleCancel = () => {
    if (progressInfo.questionsData[props.questionId].note.status) {
      setEditMode(false);
    } else {
      props.onClose();
    }
  };

  const handleSaveNote = () => {
    addNote(props.questionId, noteContent);
    setEditMode(false);
    props.onClose();
  };

  const handleEditNote = () => {
    setNoteContent(progressInfo.questionsData[props.questionId].note.content);
    setEditMode(true);
  };

  const handleDeleteNote = () => {
    deleteNote(props.questionId);
    setEditMode(true);
    setNoteContent("");
    props.onClose();
  };

  return (
    <>
      <div className={`popup-overlay ${props.className}`}></div>
      <div className={`popup-container ${props.className}`}>
        <h2 className="note-title">{props.questionTitle}</h2>

        {/* Note Content*/}
        {editMode ? (
          <textarea
            className="popup-content"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          ></textarea>
        ) : (
          <div className="popup-content">
            {progressInfo.questionsData[props.questionId].note.content}
          </div>
        )}

        {/* Buttons */}
        <div className="popup-btns-div">
          {/* delete button */}
          {progressInfo.questionsData[props.questionId].note.status && (
            <button onClick={() => handleDeleteNote()} className="delete-btn">
              <img src={delete_icon} alt="" />
            </button>
          )}

          {editMode ? (
            // editing mode buttons
            <div className="popup-btns-right">
              <SecondaryBtn
                className="cancel-btn"
                text="Cancel"
                onClick={handleCancel}
              />
              <SecondaryBtn
                className="save-btn"
                text="Save"
                onClick={() => handleSaveNote()}
              />
            </div>
          ) : (
            // viewing mode buttons
            <div className="popup-btns-right">
              <SecondaryBtn
                className="edit-btn"
                text="Edit"
                onClick={() => handleEditNote()}
              />
              <SecondaryBtn
                className="close-btn"
                text="Close"
                onClick={props.onClose}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotePopup;
