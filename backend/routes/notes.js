const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Route 1: Get all notes using Get "api/notes/getallnotes" Login required
router.get("/getallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Route 2:Add a new notes using POST "api/notes/addnote" Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleat 5 characters").isLength({ min: 5 })
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const result = validationResult(req);
      // If there are errors , return bad request and the errors
      if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// Route 3:Update an existing notes using PUT "api/notes/updatenote" Login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a new note object
    const updatedNote = {};
    if (title) {
      updatedNote.title = title;
    }
    if (description) {
      updatedNote.description = description;
    }
    if (tag) {
      updatedNote.tag = tag;
    }

    // Find a note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: updatedNote }, { new: true });
    res.json(note);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Route 3:Delete an existing notes using DELETE "api/notes/deletenote" Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Find a note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }

    //Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "note has been deleted", note: note });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
