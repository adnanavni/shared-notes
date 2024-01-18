const Note = require("../models/noteModel");
const mongoose = require("mongoose");

const getAllNotes = async (req, res) => {
  const userId = req.user._id;
  const notes = await Note.find({
    $or: [{ author: userId }, { collaborators: userId }],
  }).sort({ createdAt: -1 });
  if (!notes) {
    res.status(400).json({ message: "No notes found" });
  }
  res.status(200).json(notes);
};

const getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }
  res.status(200).json(note);
};

const createNote = async (req, res) => {
  const { title, content, collaborators } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Please enter all the required fields" });
  }
  try {
    const author = req.user._id;
    const note = await Note.create({ title, content, author, collaborators });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const note = await Note.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the note" });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const note = await Note.findByIdAndDelete(id);
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the note" });
  }
};

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
