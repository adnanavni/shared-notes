const express = require("express");
const {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const requireAuth = require("../middleware/requireAuth");

const noteRouter = express.Router();

noteRouter.use(requireAuth);

noteRouter.get("/", getAllNotes);
noteRouter.get("/:id", getNote);
noteRouter.post("/", createNote);
noteRouter.patch("/:id", updateNote);
noteRouter.delete("/:id", deleteNote);

module.exports = noteRouter;
