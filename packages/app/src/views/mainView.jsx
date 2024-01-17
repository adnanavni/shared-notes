import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import Note from "../components/note";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const StyledMain = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fffdd7;
  justify-content: center;
  min-height: 84vh;
`;

function MainView() {
  const { notes, dispatch } = useNotesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(backendUrl + "/api/notes", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      dispatch({ type: "SET_NOTES", payload: result.data });
    };

    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  return (
    <StyledMain>
      {notes && notes.map((note) => <Note note={note} key={note._id} />)}
    </StyledMain>
  );
}

export default MainView;
