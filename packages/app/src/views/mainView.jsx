import axios from "axios";
import { useEffect } from "react";
import Note from "../components/note";
import NoteForm from "../components/noteForm";
import { useNotesContext } from "../hooks/useNotesContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function MainView() {
  const { notes, dispatch } = useNotesContext();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(backendUrl + "/api/notes");
      dispatch({ type: "SET_NOTES", payload: result.data });
    };

    fetchData();
  }, [dispatch]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        {notes && notes.map((note) => <Note note={note} key={note._id} />)}
      </div>
      <NoteForm />
    </div>
  );
}

export default MainView;
