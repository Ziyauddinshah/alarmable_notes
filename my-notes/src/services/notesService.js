import axios from "axios";

const url = "http://localhost:3008/notes";

const getAllNotes = () => {
  return axios.get(`${url}/get-all`);
};

const addNote = (note_text, duration) => {
  return axios.post(`${url}/add`, { note_text: note_text, duration: duration });
};

const editNote = (id, note_text) => {
  return axios.put(`${url}/edit/${id}`, { note_text: note_text });
};

const deleteNote = (id) => {
  return axios.delete(`${url}/delete/${id}`);
};

const getNoteById = (id) => {
  return axios.get(`${url}/get/${id}`);
};
// const notesService = {
//   getAllNotes,
//   addNote,
//   editNote,
//   deleteNote,
//   getNoteById,
// };
// export default notesService;
export { getAllNotes, addNote, editNote, deleteNote, getNoteById };
