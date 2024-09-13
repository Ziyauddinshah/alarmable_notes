const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");
router.get("/get-all", notesController.getAll);
router.post("/add", notesController.addNote);
router.put("/edit/:id", notesController.editNote);
router.delete("/delete/:id", notesController.deleteNote);
router.get("/get/:id", notesController.getNoteById);
module.exports = router;
