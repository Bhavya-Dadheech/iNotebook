import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function NoteItem({ note, updateNote, showAlert }) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description} </p>
          <i
            role="button"
            className="mx-1 fa-solid fa-trash-can"
            onClick={() => {
              deleteNote(note._id);
              showAlert("Deleted successfully", "primary");
            }}
          ></i>
          <i
            role="button"
            className="mx-1 fa-solid fa-pen-to-square"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
