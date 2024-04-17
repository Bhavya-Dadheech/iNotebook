import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

export default function AddNote({ showAlert }) {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note);
    showAlert("Added successfully", "primary");
    setNote({ title: "", description: "", tag: "" });
    navigate("/home");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="m-auto w-50">
      <h1>Add a Note.</h1>
      <form onSubmit={handleAddNote} className="d-flex flex-column ">
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
          className={`m-auto btn btn-primary ${
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
