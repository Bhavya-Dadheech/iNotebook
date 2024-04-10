import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/api/notes";
  const notesNew = [];

  const [notes, setNotes] = useState(notesNew);

  // Get Notes.
  const getNotes = async () => {
    const response = await fetch(`${host}/getallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a Note.
  const addNote = async ({ title, description, tag }) => {
    const response = await fetch(`${host}/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    if (response) {
      getNotes();
    }
  };

  // Edit a Note.
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });

    if (response) {
      getNotes();
    }
  };

  // Delete a Note.
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });

    if (response) {
      getNotes();
    }
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
