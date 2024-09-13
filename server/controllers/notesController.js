const sql = require("../database/db");

async function getAll(req, res, next) {
  try {
    const query = "select * from notes order by id asc";
    sql.query(query, [], (error, result) => {
      if (error) {
        // console.log("error in getAll notes: ", error);
        return res.status(400).send({
          message: "Something went wrong in getAll notes, syntax error",
        });
      } else {
        if (result.length < 1) {
          // console.log("result: ", result);
          res.status(200).json({ message: "No note available" });
        } else {
          // console.log("result: ", result);
          res.status(200).json({ data: result, message: "Success" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in getAll posts" });
  }
}

async function addNote(req, res, next) {
  try {
    const { note_text, duration } = req.body;
    const query = "insert into notes(note_text,duration) values(?,?)";
    sql.query(query, [note_text, duration], (error, result) => {
      if (error) {
        // console.log("error in addNote: ", error);
        return res
          .status(202)
          .send({ message: "Something went wrong in addNote, syntax error" });
      } else {
        getAll(req, res, next);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in addNote" });
  }
}

async function editNote(req, res, next) {
  try {
    const id = req.params.id;
    const note_text = req.body.note_text;
    const query1 = "select * from notes where id=?";
    const query2 = "update notes set note_text=? where id=?";
    sql.query(query1, [id], (error1, result1) => {
      if (error1) {
        return res
          .status(202)
          .send({ message: "Something went wrong in editNote, syntax error" });
      } else {
        if (result1.length < 1) {
          res.status(200).json({ message: "No note available with given id" });
        } else {
          sql.query(query2, [note_text, id], (error2, result2) => {
            if (error2) {
              return res.status(202).send({
                message: "Something went wrong in editNote, syntax error",
              });
            } else {
              res.status(200).json({ message: "Note edited successfully" });
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in editNote" });
  }
}

async function deleteNote(req, res, next) {
  try {
    const id = req.params.id;
    const query1 = "select * from notes where id=?";
    const query2 = "delete from notes where id=?";
    sql.query(query1, [id], (error1, result1) => {
      if (error1) {
        // console.log("error1 in deleteNote: ", error1);
        return res.status(202).send({
          message: "Something went wrong in deleteNote, syntax error",
        });
      } else {
        // console.log("result1: ", result1);
        if (result1.length < 1) {
          res.status(200).json({ message: "No note available with given id" });
        } else {
          sql.query(query2, [id], (error2, result2) => {
            if (error2) {
              return res.status(202).send({
                message: "Something went wrong in deleteNote, syntax error",
              });
            } else {
              getAll(req, res, next);
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in deleteNote" });
  }
}

async function getNoteById(req, res, next) {
  try {
    const id = req.params.id;
    const query = "select * from notes where id=?";
    sql.query(query, [id], (error, result) => {
      if (error) {
        // console.log("error1 in getNoteById: ", error);
        return res.status(400).send({
          message: "Something went wrong in getNoteById, syntax error",
        });
      } else {
        // console.log("result: ", result);
        if (result.length < 1) {
          res.status(200).json({ message: "No note available with given id" });
        } else {
          res.status(200).json({ data: result, message: "Success" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in getNoteById" });
  }
}

module.exports = {
  getAll,
  addNote,
  editNote,
  deleteNote,
  getNoteById,
};
