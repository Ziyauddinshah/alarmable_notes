import React, { useEffect, useState } from "react";
import { getAllNotes, addNote, deleteNote } from "../services/notesService";
import Countdown from "./Countdown";

const NotePage = () => {
  const [seconds, setSeconds] = useState(0);
  const [text, setText] = useState("");
  const [textArea, setTextArea] = useState(false);
  const [notesData, setNotesData] = useState([]);
  const [showPreviousNotes, setShowPreviousNotes] = useState(false);
  useEffect(() => {
    getAllNotes()
      .then((response) => {
        if (response.data.data.length > 0) {
          const data = response.data.data;
          setNotesData(data);
        }
      })
      .catch((error) => {
        console.log("error ", error);
      });
  }, [notesData]);
  const openTextArea = () => {
    setTextArea(!textArea);
  };
  const saveNote = () => {
    addNote(text, seconds)
      .then((response) => {
        console.log(response);
        setText("");
        setSeconds(0);
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };
  const addAlarm = () => {
    saveNote();
  };
  const handleChange = (event) => {
    setSeconds(parseInt(event.target.value, 10) || 0);
  };
  const deleteN = (id) => {
    deleteNote(id)
      .then((response) => {
        if (response.data.data.length > 0) {
          const data = response.data.data;
          setNotesData(data);
        }
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => openTextArea()}
          >
            Open Note
          </button>
          <div className="mt-2">
            {textArea ? (
              <textarea
                id="myNoteText"
                name="myNoteText"
                rows="4"
                cols="40"
                value={text}
                onChange={(event) => setText(event.target.value)}
              ></textarea>
            ) : null}
          </div>
          {textArea ? (
            <div className="mt-3" style={{ alignContent: "center" }}>
              <label for="duration">Alarm Duration:</label>
              <input
                type="number"
                value={seconds}
                onChange={handleChange}
                min="1"
                style={{ width: 100 + "px" }}
              />
              <button
                type="button"
                className="btn btn-success ml-1"
                onClick={() => addAlarm()}
              >
                Add Alarmable Note
              </button>
            </div>
          ) : null}
        </div>
        <div className="col-md-6">
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-primary btn-sm mb-1"
              onClick={() => setShowPreviousNotes(!showPreviousNotes)}
            >
              Previous notes
            </button>
            {showPreviousNotes == true &&
              notesData.map((val, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-center bg-light text-dark mb-2"
                >
                  <div className="p-2 bd-highlight">
                    <span>{val.note_text}</span>
                  </div>
                  <div className="p-2 bd-highlight">
                    <Countdown duration={val.duration} />
                  </div>
                  <div className="p-2 bd-highlight float-end">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm ml-1"
                      onClick={() => deleteN(val.id)}
                    >
                      Delete Note
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotePage;
