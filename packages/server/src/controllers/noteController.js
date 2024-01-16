const Note = require("../models/noteModel");

 const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  if (!notes) {
    res.status(400).json({ message: "No notes found" });
  }
  res.status(200).json(notes);
};

 const getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400).json({ message: "Note not found" });
  }
  res.status(200).json(note);
};

const createNote = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Please enter all the required fields" });
  }

  const note = await Note.create(req.body);
  if (!note) {
    return res.status(400).json({ message: "Note could not be created" });
  }
  res.status(201).json(note);
};

const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const note = await Note.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.status(200).json(note);
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const note = await Note.findOneAndDelete({ _id: id });
  res.status(200).json(note);
}



module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};