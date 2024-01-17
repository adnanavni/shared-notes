import styled from "styled-components";
import Note from "../components/note";
import axios from "axios";
import { useEffect } from "react";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const StyledMain = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.1rem;
  background-color: #fffdd7;
  justify-content: center;
  min-height: calc(100vh - 4.15rem - 4.1rem);
`;

const StyledRoundButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 5rem;
  text-decoration: none;
  color: black;
  left: 50%;
  transform: translateX(-50%);
  width: 4rem;
  border-radius: 50%;
  border: none;
  background-color: #c3c19d;
  font-size: 3rem;
  cursor: pointer;
  box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: #424133;
    color: white;
  }
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
      <StyledRoundButton to={"/createnote"}>+</StyledRoundButton>
    </StyledMain>
  );
}

export default MainView;
