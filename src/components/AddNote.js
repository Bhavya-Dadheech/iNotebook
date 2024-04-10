import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote({ showAlert }) {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note);
    showAlert("Added successfully", "primary");
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="my-2">
      <h1>Add a Note.</h1>
      <form onSubmit={handleAddNote}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
            minLength={5}
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            autoComplete="off"
            onChange={onChange}
            required
            minLength={5}
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            autoComplete="off"
            onChange={onChange}
            required
            minLength={5}
            value={note.tag}
          />
        </div>
        <button
          type="submit"
          className={`btn btn-primary ${
            note.title.length < 5 || note.description.length < 5 || note.tag.length < 5 ? "not-allowed" : ""
          }`}
          disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
