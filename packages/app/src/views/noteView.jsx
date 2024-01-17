import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Note from "../components/note";
import { StyledMain } from "./mainView";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const NoteView = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${backendUrl}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setNote(result.data);
      setLoading(false);
    };

    if (user) {
      fetchData();
    }
  }, [id, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <div>No note found</div>;
  }

  return (
    <StyledMain>
      <Note note={note} />
    </StyledMain>
  );
};

export default NoteView;
